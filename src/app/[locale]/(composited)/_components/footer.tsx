import Image from "next/image";
import logo from "@/app/logo.png";
import SplashText from "@/app/[locale]/(composited)/_components/splash-text";
import FooterLink from "@/app/[locale]/(composited)/_components/footer-link";
import Link from "@/app/[locale]/_components/localised-link";
import {SquareArrowUp} from "solar-icon-set";
import {useTranslations} from "next-intl";
import {default as splashes} from "@/data/splashes.json";

export default function Footer() {
    const t = useTranslations("nav");

    return (
        <footer className="flex flex-col gap-16 mt-16 px-8 md:px-16 bg-white pt-4 pb-16">
            <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-8">
                <div className="flex flex-col gap-4 items-center lg:items-start">
                    <Image src={logo} alt={t("logo")} width={64} />
                    <h3 className="font-display font-bold text-5xl cursor-help w-full max-w-xs text-center lg:text-left">
                        <SplashText splashes={[
                            t("title"),
                            ...splashes.map(s => s.toLowerCase())
                        ]} />
                    </h3>
                    <p className="text-xl text-neutral-800 w-full max-w-xs text-center lg:text-left">{t("description")}</p>
                </div>
                <div className="flex flex-col gap-8 lg:gap-4 items-center lg:items-start">
                    <FooterLink
                        href="#download"
                        text={t('download')}
                    />
                    <FooterLink
                        href="/legal/privacy"
                        text={t('privacy')}
                    />
                </div>
                <div className="flex flex-col gap-8 lg:gap-4 items-center lg:items-start">
                    <FooterLink
                        href="https://github.com/exteraSquad"
                        text={t('source')}
                    />
                    <FooterLink
                        href="https://t.me/exteraChat"
                        text={t('chats')}
                    />
                </div>
                <Link
                    href="#top"
                    role="button"
                    className="group w-32 h-32 font-bold font-display aspect-square text-4xl overflow-hidden hover:bg-primary-500 flex-col
                        hover:text-primary-50 rounded-full bg-primary-100 text-primary-500 flex justify-center items-center transition-colors
                        active:bg-primary-400 active:text-primary-50 duration-300 ease-in-out"
                >
                    <div className="group-hover:-translate-y-32 transition-transform duration-300 ease-in-out">up</div>
                    <div className="translate-y-32 group-hover:-translate-y-12 transition-transform h-0 duration-300 ease-in-out">
                        <SquareArrowUp size={60} iconStyle="Bold" />
                    </div>
                </Link>
            </div>
            <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-2 lg:gap-8 text-neutral-800">
                <div className="hover:font-semibold transition-all flex gap-1">
                    {t('credits.design') + ' '}
                    <Link href="https://t.me/r4in80w8i0" className="text-primary-500" underline>
                        tierohnenation
                    </Link>
                </div>
                <div className="hover:font-semibold transition-all flex gap-1">
                    {t('credits.dev') + ' '}
                    <Link href="https://otomir23.me" className="text-primary-500" underline>
                        otomir23
                    </Link>
                </div>
            </div>
        </footer>
    )
}