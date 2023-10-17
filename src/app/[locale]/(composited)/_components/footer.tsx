import Image from "next/image";
import logo from "@/app/[locale]/_assets/logos/logo.png";
import SplashText from "@/app/[locale]/(composited)/_components/splash-text";
import FooterLink from "@/app/[locale]/(composited)/_components/footer-link";
import Link from "@/app/[locale]/_components/link";
import {SquareArrowUp} from "solar-icon-set";
import {useTranslations} from "next-intl";
import {default as splashes} from "@/data/splashes.json";

export default function Footer() {
    const t = useTranslations("nav");

    return (
        <footer className="flex flex-col gap-16 mt-16 px-8 md:px-16 bg-white pt-4 pb-16">
            <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-8">
                <div className="flex flex-col gap-4 items-center lg:items-start mb-12 md:mb-0">
                    <Image src={logo} alt={t("logo")} width={64} />
                    <h3 className="font-display font-bold text-4xl md:text-5xl cursor-help w-full max-w-xs text-center lg:text-left">
                        <SplashText splashes={[
                            t("title"),
                            ...splashes.map(s => s.toLowerCase())
                        ]} />
                    </h3>
                    <p className="text-xl text-neutral-800 w-full max-w-sm text-center lg:text-left">{t("description")}</p>
                </div>
                <div className="flex flex-col gap-8 lg:gap-4 items-center lg:items-start w-full max-w-xs">
                    <FooterLink
                        href="/#download"
                    >
                        {t('download')}
                    </FooterLink>
                    <FooterLink
                        href="/legal/privacy"
                    >
                        {t('privacy')}
                    </FooterLink>
                </div>
                <div className="flex flex-col gap-8 lg:gap-4 items-center lg:items-start w-full max-w-xs">
                    <FooterLink
                        href="https://github.com/exteraSquad"
                    >
                        {t('source')}
                    </FooterLink>
                    <FooterLink
                        href="https://t.me/exteraChat"
                    >
                        {t('chats')}
                    </FooterLink>
                </div>
                <Link
                    href="#top"
                    role="button"
                    className="group w-32 h-32 font-bold font-display aspect-square text-4xl overflow-hidden hover:bg-primary-500 flex-col
                        hover:text-primary-50 rounded-full bg-primary-100 text-primary-500 flex justify-center items-center transition-colors
                        active:bg-primary-400 active:text-primary-50 duration-300 ease-in-out min-w-max min-h-max"
                >
                    <div className="group-hover:-translate-y-32 transition-transform duration-300 ease-in-out">up</div>
                    <div className="translate-y-32 group-hover:-translate-y-5 transition-transform h-0 duration-300 ease-in-out flex items-center">
                        <SquareArrowUp size={60} iconStyle="Bold" />
                    </div>
                </Link>
            </div>
            <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-2 lg:gap-8 text-neutral-800">
                <div className="hover:font-semibold transition-all flex gap-1">
                    {t('credits.design') + ' '}
                    <Link href="https://t.me/Design480" className="text-primary-500" underline>
                        480 Design
                    </Link>
                </div>
                <div className="hover:font-semibold transition-all flex gap-1">
                    {t('credits.dev') + ' '}
                    <Link href="https://github.com/exteraSquad" className="text-primary-500" underline>
                        exteraSquad
                    </Link>
                </div>
            </div>
        </footer>
    )
}
