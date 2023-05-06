import Link from "@/app/[locale]/_components/localised-link";
import Image from "next/image";

export type TeamMemberProps = {
    href: string;
    name: string;
    role: string;
    img: string;
    buttonText: string;
}

export default function TeamMember({href, name, role, img, buttonText}: TeamMemberProps) {
    return (
        <figure
            className="group border-2 border-neutral-300 rounded-4xl p-4 flex flex-col justify-center
                        items-center w-72 md:w-96 h-96 md:h-[32rem] hover:border-primary-500 overflow-hidden bg-white transition-colors"
        >
            <div className="w-full flex-1" />
            <Image src={img} alt={name} className="rounded-full aspect-square mb-6" width={150} height={150} />
            <h6 className="font-display font-bold text-2xl md:text-3xl">{name}</h6>
            <p className="text-xl md:text-2xl">{role}</p>
            <div className="w-full flex-1" />
            <Link
                className="translate-y-24 group-hover:translate-y-0 transition-transform w-full py-3 md:py-6 text-xl md:text-2xl
                bg-primary-500 text-white rounded-xl active:bg-primary-400 active:text-white flex justify-center items-center"
                href={href}
                target="_blank"
            >
                {buttonText}
            </Link>
        </figure>
    )
}