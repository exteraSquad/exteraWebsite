import {cachedFetch} from "@/sanity.client";
import {groq} from "next-sanity";
import {getLocale} from "next-intl/server";
import {ExampleSchema} from "@/sanity.config";
import { PortableText } from "@portabletext/react";

export default async function ExampleDataRenderer() {
    const locale = getLocale()
    const exampleData = await cachedFetch<ExampleSchema[]>(groq`*[_type == "example" && language == $locale]`, {locale})
    return (<div className="flex o-2 mx-offset w-full-no-offset">
        {exampleData.map(e => <div key={e._id} className="p-4 border border-primary-200 rounded">
            <h1>{e.name}</h1>
            <div
                className="prose prose-neutral prose-headings:font-bold prose-headings:font-display prose-headings:text-black
                prose-a:text-primary-400 prose-a:underline marker:text-inherit prose-li:text-left"
            >
                <PortableText
                    value={e.content}
                />
            </div>
        </div>)}
    </div>)
}