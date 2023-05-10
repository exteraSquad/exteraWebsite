import "server-only";
import fs from "fs";
import {createElement} from "react";

export function unsafelyLoadSVG(path: string) {
    const contents = fs.readFileSync('./public/' + path, "utf-8");
    return createElement("span", {dangerouslySetInnerHTML: {__html: contents}});
}