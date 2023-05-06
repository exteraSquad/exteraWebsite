import {default as icons} from "@/data/icons.json";
import {PathData} from "@/app/[locale]/_components/icon-canvas";

export const checkedIcons = icons.filter((i): i is PathData =>
    i.fillRule === "nonzero" || i.fillRule === "evenodd"
);