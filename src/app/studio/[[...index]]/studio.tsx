'use client'

import {NextStudio} from 'next-sanity/studio'

import config from '@/sanity.config'

export function Studio() {
    // @ts-ignore The plugin types are broken, it actually works
    return <NextStudio config={config} />
}