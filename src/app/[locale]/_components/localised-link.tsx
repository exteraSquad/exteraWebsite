import React from "react";
import {useLocale} from "next-intl";
import {LinkProps, default as BaseLink} from "@/app/[locale]/_components/link";
import "server-only";

export default function Link(
    {href, locale: newLocale, children, ...props}: LinkProps & { locale?: string }
) {
    // This is server-only code, so it's safe to conditionally call hooks
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const locale = newLocale || useLocale();

    return (
        <BaseLink href={href.startsWith('/') ? '/' + locale + href : href} {...props}>
            {children}
        </BaseLink>
    )
}