import HomeLink from "@/app/[locale]/(composited)/_components/home-link";

export type FooterLinkProps = {
    href: string;
    text: string;
}

export default function FooterLink({href, text}: FooterLinkProps) {
    return (
        <HomeLink
            href={href}
            className="text-neutral-800 hover:text-black lg:hover:font-semibold text-4xl md:text-3xl lg:text-lg transition-all
            w-fit text-center lg:text-left font-display font-bold lg:font-sans lg:font-normal"
            underline
            key={text}
        >
            {text}
        </HomeLink>
    )
}