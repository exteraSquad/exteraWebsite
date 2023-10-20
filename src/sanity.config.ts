import {defineConfig, castToTyped, InferSchemaValues} from '@sanity-typed/types'
import {deskTool} from 'sanity/desk'
import {documentInternationalization} from "@sanity/document-internationalization";

import {schemaTypes} from '@/schemas'
import {localeConfig} from "@/i18n";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

const config = defineConfig({
    basePath: '/studio',
    projectId,
    dataset,
    plugins: [
        castToTyped(deskTool()),
        castToTyped(documentInternationalization({
            supportedLanguages: localeConfig.locales.map(id => ({
                id,
                title: id.toUpperCase()
            })),
            schemaTypes: schemaTypes
                .filter(s => s.options && "translatable" in s.options && s.options.translatable)
                .map(s => s.name),
        }))
    ],
    schema: {
        types: schemaTypes,
    },
})

export default config;
type Values = InferSchemaValues<typeof config>;
export type ExampleSchema = Values["example"];