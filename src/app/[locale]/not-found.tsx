import {useTranslations} from "next-intl";
import {checkedIcons} from "@/loaders/icons";
import IconCanvas from "@/app/[locale]/_components/icon-canvas";
import Link from "@/app/[locale]/_components/link";
import Button from "@/app/[locale]/_components/button";
import {Metadata} from "next";

export default function ErrorNotFound() {
    const t = useTranslations("errors.notFound");

    return (
        <>
            <IconCanvas probability={0.02} paths={checkedIcons} color="#F54142" />
            <div className="flex flex-col items-center justify-center h-screen w-full gap-8 text-center">
                <h1 className="font-display font-bold text-8xl md:text-9xl text-primary-500">404</h1>
                <p className="text-xl md:text-3xl px-4 max-w-md md:max-w-xl">{t("description")}</p>
                <Link href="/" className="text-primary-500 font-bold text-3xl">
                    <Button>
                        {t("button")}
                    </Button>
                </Link>
            </div>
        </>
    )
}

export const metadata: Metadata = {
    title: "404",
}