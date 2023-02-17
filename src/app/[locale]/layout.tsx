import '@/app/globals.css'
import React, {ReactNode} from "react";
import localFont from "@next/font/local";
import {useLocale} from 'next-intl';
import {notFound} from "next/navigation";
import {getLocale, getTranslations} from "next-intl/server";
import {localeConfig} from "@/i18n";

const calSans = localFont({
    src: '../fonts/CalSans-SemiBold.woff2',
    variable: '--font-cal-sans',
})
const onest = localFont({
    src: [
        {
            path: '../fonts/Onest-Regular.woff',
            weight: '400',
        },
        {
            path: '../fonts/Onest-Medium.woff',
            weight: '500',
        },
    ],
    variable: '--font-onest',
})

type RootLayoutProps = {
    children: ReactNode;
    params: { locale: string };
};

export default function RootLayout(
    {children, params: {locale: reqLocale}}: RootLayoutProps
) {
    const locale = useLocale();
    if (reqLocale !== locale) notFound();

    // noinspection HtmlRequiredTitleElement
    return (
        <html lang={locale}>
        <head/>
        <body className={`${onest.variable} ${calSans.variable} font-sans`}>{children}</body>
        </html>
    )
}

export async function generateMetadata() {
    const locale = getLocale();
    const t = await getTranslations('meta');
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

    return {
        title: {
            default: t('fullTitle'),
            template: "%s | " + t('title')
        },
        description: t('description'),
        generator: "Next.js",
        colorScheme: "light",
        openGraph: {
            type: "website",
            locale: locale,
            title: t('fullTitle'),
            description: t('description'),
            siteName: t('title'),
            url: baseUrl,
            images: [
                {
                    url: baseUrl + "/images/og.png",
                    width: 800,
                    height: 600,
                },
            ],
        },
        alternates: {
            canonical: baseUrl,
            languages: localeConfig.locales.reduce((acc, locale) => {
                acc[locale] = baseUrl + "/" + locale;
                return acc;
            }, {} as Record<string, string>)
        }
    };
}