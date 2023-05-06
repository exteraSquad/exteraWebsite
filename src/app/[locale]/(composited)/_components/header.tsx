import Link from "@/app/[locale]/_components/localised-link";
import {CloseCircle, HamburgerMenu} from "solar-icon-set";
import {useTranslations} from "next-intl";
import HomeLink from "@/app/[locale]/(composited)/_components/home-link";
import HeaderLogo from "@/app/[locale]/(composited)/_components/header-logo";
import Button from "@/app/[locale]/_components/button";
import Marquee from "@/app/[locale]/_components/marquee";

export default function Header() {
    const t = useTranslations("nav");

    return (
        <header
            className="flex justify-between items-center mb-16 font-display font-bold text-2xl sticky top-0 py-8
            bg-white px-8 md:px-16 z-40"
        >
            <HeaderLogo />
            <label>
                <input type="checkbox" className="hidden peer" id="menu"/>
                <div className="md:hidden cursor-pointer">
                    <HamburgerMenu size={32}/>
                </div>
                <nav
                    className="hidden md:flex peer-checked:flex items-center gap-8 fixed md:static inset-0 w-screen
                    md:w-auto h-screen md:h-auto flex-col md:flex-row justify-center md:bg-transparent bg-white
                    text-center"
                >
                    <div className="absolute top-8 right-8 md:hidden w-8">
                        <CloseCircle size={32}/>
                    </div>
                    <HomeLink href="#team" className="text-black hover:text-neutral-800 transition-colors">
                        {t('team')}
                    </HomeLink>
                    <HomeLink href="#features" className="text-black hover:text-neutral-800 transition-colors">
                        {t('features')}
                    </HomeLink>
                    <HomeLink
                        href="#download"
                        className="hidden md:block"
                    >
                        <Button className="w-14 overflow-hidden md:w-48 word-spacing-6 px-[0!important]">
                            <Marquee repeatCount={2}>
                                {t('download')}
                            </Marquee>
                        </Button>
                    </HomeLink>
                    <HomeLink href="#download" className="md:hidden">
                        {t('download')}
                    </HomeLink>
                    <Link href="/legal/privacy" className="md:hidden">
                        {t('privacy')}
                    </Link>
                    <Link href="https://github.com/exteraSquad" className="md:hidden">
                        {t('source')}
                    </Link>
                    <Link href="https://t.me/exteraChat" className="md:hidden">
                        {t('chats')}
                    </Link>
                </nav>
            </label>
        </header>
    )
}