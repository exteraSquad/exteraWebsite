import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
    const localeFile = await import(`./locales/${locale}.json`);
    const messages = localeFile.default || {};

    return {
        messages
    }
});

export const localeConfig = {
    locales: ['en', 'ru'],
    defaultLocale: 'en'
}