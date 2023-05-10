import "server-only";
import fs from 'fs'
import path from 'path'
import {createElement} from "react";

export function unsafelyLoadSVG(filePath: string) {
    const absolutePath = path.resolve('./public', ...filePath.split('/').filter(x => x !== ''));
    const contents = fs.readFileSync(absolutePath, "utf-8");
    return createElement("span", {dangerouslySetInnerHTML: {__html: contents}});
}