import { remark } from 'remark';
import html from 'remark-html';
import policy from "@/data/privacy-policy.md"
import {Database, ShieldUser} from "solar-icon-set";
import logo from "@/app/[locale]/_assets/logos/logo.svg";
import Image from "next/image";
import {Metadata} from "next";

export default async function PrivacyPolicy() {
    const processedContent = await remark()
        .use(html)
        .process(policy);
    const contentHtml = processedContent.toString();

    return (
        <div className="w-full text-center max-w-xl px-2 mx-auto my-16 text-neutral-700">
            <aside className="flex items-center justify-center gap-4 text-primary-500 mb-8">
                <Image src={logo} alt="exteraGram logo" />
                <ShieldUser iconStyle="Bold" color="inherit" size={64} />
                <Database iconStyle="Bold" color="inherit" size={64} />
            </aside>
            <div
                className="prose prose-neutral prose-headings:font-bold prose-headings:font-display prose-headings:text-black
                prose-a:text-primary-400 prose-a:underline marker:text-inherit prose-li:text-left"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        </div>
    )
}

export const metadata: Metadata = {
    title: "Privacy Policy",
}