import {ReactNode} from "react";
import Link from "@/app/[locale]/_components/link";

export type DownloadButtonProps = {
    disabled?: boolean,
    href?: string,
    name: string,
    eyebrow: string,
    icon: ReactNode
} & ({disabled?: true;} | {disabled?: false | undefined; href: string;})

export default function DownloadButton({disabled, href, icon, name, eyebrow}: DownloadButtonProps) {
    return (
        <Link
            className={`rounded-3xl border-2 border-neutral-200 ${disabled ? 'pointer-events-none text-neutral-300' : 'text-neutral-800'} 
                flex flex-row px-8 py-5 hover:text-primary-500 transition-colors items-center gap-8 w-full max-w-md lg:max-w-xs 
                bg-white hover:border-primary-500 duration-300 ease-in-out`}
            href={href || "#"}
        >
            {icon}
            <div className="flex flex-col">
                <p className="text-xl">{eyebrow}</p>
                <p className="font-display font-bold text-3xl">{name}</p>
            </div>
        </Link>
    )
}