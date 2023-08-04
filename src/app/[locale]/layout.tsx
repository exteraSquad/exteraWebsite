import '@/app/[locale]/_assets/globals.css'
import React, {ReactNode} from "react";
import localFont from "next/font/local";
import {useLocale} from 'next-intl';
import {notFound} from "next/navigation";
import {getLocale, getTranslations} from "next-intl/server";
import {localeConfig} from "@/i18n";
import {Metadata} from "next";
import Cursor from "@/app/[locale]/_components/cursor";

const calSans = localFont({
    src: '_assets/fonts/CalSans-SemiBold.woff2',
    variable: '--font-cal-sans',
    display: "swap"
})
const onest = localFont({
    src: [
        {
            path: '_assets/fonts/Onest-Regular.woff',
            weight: '400',
        },
        {
            path: '_assets/fonts/Onest-Medium.woff',
            weight: '500',
        },
        {
            path: '_assets/fonts/Onest-Bold.woff',
            weight: '700'
        }
    ],
    variable: '--font-onest',
    display: "swap"
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
        <html lang={locale} className="scroll-smooth selection:bg-primary-100 selection:text-primary-500">
        <head/>
        <body className={`${onest.variable} ${calSans.variable} font-sans overscroll-none`} style={{
            '--font-sans': 'var(--font-onest)',
            '--font-display': locale == 'ru' ? 'var(--font-onest)' : 'var(--font-cal-sans)',
        } as any}>
            <Cursor />
            {children}
        </body>
        </html>
    )
}

export async function generateMetadata(): Promise<Metadata> {
    const locale = getLocale();
    const t = await getTranslations('meta');
    const canonicalUrl = process.env.CANONICAL_URL ||
        (process.env.NODE_ENV === "development" ? `http://localhost:${process.env.PORT || 3000}` :
            `https://${process.env.VERCEL_URL}` || "")

    return {
        metadataBase: new URL(canonicalUrl),
        title: {
            default: t('fullTitle'),
            template: "%s | " + t('title')
        },
        description: t('description'),
        generator: "Next.js",
        colorScheme: "light",
        themeColor: "#F54142",
        icons: {
            icon: '/favicon.ico',
            shortcut: '/favicon.ico',
        },
        openGraph: {
            type: "website",
            locale: locale,
            title: t('fullTitle'),
            description: t('description'),
            siteName: t('title'),
            url: '/',
            images: "/images/og.png",
        },
        twitter: {
            card: "app",
            title: t('title'),
            description: t('description'),
            images: "/images/og.png",
            site: "@immat0x1",
            app: {
                id: {
                    googleplay: "com.exteragram.messenger"
                }
            }
        },
        alternates: {
            canonical: '/',
            languages: localeConfig.locales.reduce((acc, locale) => {
                acc[locale] = "/" + locale;
                return acc;
            }, {} as Record<string, string>)
        }
    };
}
