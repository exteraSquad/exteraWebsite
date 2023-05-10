import 'server-only';
import {useLocale} from "next-intl";

export function localisePath(path: string) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const locale = useLocale()
    return path.replaceAll('{locale}', locale);
}