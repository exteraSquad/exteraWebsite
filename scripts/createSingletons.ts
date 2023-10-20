import {getCliClient} from 'sanity/cli'
import {localeConfig} from "@/i18n";

/**
 * This script will create one or many "singleton" documents for each language
 * It works by appending the language ID to the document ID
 * and creating the translations.metadata document
 */

const SINGLETONS: {id: string, _type: string, title: String}[] = [
    //{id: 'config', _type: 'page', title: 'Configuration'}, TODO
]
const LANGUAGES = localeConfig.locales.map(id => ({
    id,
    title: id.toUpperCase()
}))

// This will use the client configured in ./sanity.cli.ts
const client = getCliClient()

async function createSingletons() {
    const documents = SINGLETONS.map((singleton) => {
        const translations = LANGUAGES.map((language) => ({
            _id: `${singleton.id}-${language.id}`,
            _type: singleton._type,
            language: language.id,
        }))

        const metadata = {
            _id: `${singleton.id}-translation-metadata`,
            _type: `translation.metadata`,
            translations: translations.map((translation) => ({
                _key: translation.language,
                value: {
                    _type: 'reference',
                    _ref: translation._id,
                },
            })),
            schemaTypes: Array.from(
                new Set(translations.map((translation) => translation._type))
            ),
        }

        return [metadata, ...translations]
    }).flat()

    const transaction = client.transaction()

    documents.forEach((doc) => {
        // @ts-ignore
        transaction.createOrReplace(doc)
    })

    await transaction
        .commit()
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.error(err)
        })
}

createSingletons()