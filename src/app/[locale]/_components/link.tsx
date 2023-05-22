import {Link as IntlLink} from "next-intl";
import React, {ComponentProps, ReactNode} from "react";

export type LinkProps = {
    underline?: boolean;
    href: string;
    children: ReactNode;
    className?: string;
} & ComponentProps<typeof IntlLink>

export default function Link(
    {
        underline,
        href,
        children,
        className,
        ...props
    }: LinkProps
) {
    return (
        <IntlLink href={href} className={(underline ? (className || "") + " group" : className)} {...props}>
            {children}
            {underline &&
                <div className="w-full scale-x-0 group-hover:scale-x-100 h-1 mt-1 rounded-full bg-primary-500 transition-transform duration-300 ease-in-out" />
            }
        </IntlLink>
    )
}