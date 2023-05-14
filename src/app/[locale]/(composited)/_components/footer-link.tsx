import Link from "@/app/[locale]/_components/link";

export type FooterLinkProps = {
    href: string;
    children: string;
}

export default function FooterLink({href, children}: FooterLinkProps) {
    return (
        <Link
            href={href}
            className="text-neutral-800 hover:text-black lg:hover:font-semibold text-3xl lg:text-lg transition-all
            w-fit text-center lg:text-left font-display font-bold lg:font-sans lg:font-normal"
            underline
            key={children}
        >
            {children}
        </Link>
    )
}