import {default as features} from "@/data/features.json";

export const getLocalizedFeatures = (locale: string) => features.find((f) => f.locale === locale) || {
    locale,
    values: []
}