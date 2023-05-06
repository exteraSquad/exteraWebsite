"use client";

import Link from "@/app/[locale]/_components/link";
import {ComponentProps} from "react";
import {usePathname} from "next-intl/client";
import {usePathname as useNextPathname} from "next/navigation";
import {localeConfig} from "@/i18n";

export default function HomeLink(props: ComponentProps<typeof Link> & { href: string }) {
    const {href, children, ...rest} = props;
    const path = usePathname();
    const nextPath = useNextPathname();
    const locale = nextPath.split("/")[1] || localeConfig.defaultLocale;

    return (
        <Link href={path === "/" || !href.startsWith('#') ? href : `/${locale}/${href}`} {...rest}>
            {children}
        </Link>
    )
}