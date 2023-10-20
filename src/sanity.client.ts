import {createClient} from 'next-sanity'
import {cache} from "react";

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2023-06-20',
    useCdn: false,
    studioUrl: '/studio',
    perspective: 'published',
})

export const cachedFetch = cache(client.fetch.bind(client))