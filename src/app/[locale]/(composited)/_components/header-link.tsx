"use client";

import Link, { LinkProps } from "@/app/[locale]/_components/link";
import {useContext} from "react";
import {MenuContext} from "@/app/[locale]/(composited)/_components/header-menu";

export type HeaderLinkProps = {
    href: string;
    children: string;
    mobile?: boolean;
} & LinkProps

export default function HeaderLink({href, children, mobile = false, ...props}: HeaderLinkProps) {
    const {open, setOpen} = useContext(MenuContext);

    return (
        <Link
            href={href}
            className={"overflow-y-hidden " + (mobile ? "md:hidden" : "")}
            onClick={() => setOpen(false)}
            {...props}
        >
            <div
                className={`md:translate-y-0 ${open ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-700 
                ease-in-out delay-700`}
            >
                {children}
            </div>
        </Link>
    )
}