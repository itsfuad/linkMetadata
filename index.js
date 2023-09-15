"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinkMetadata = void 0;
function getLinkMetadata(message) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const regex = /https?:\/\/[^\s]+/g;
        const link = message.match(regex);
        if (link) {
            console.log(`Link: ${link[0]}`);
            const url = link[0];
            const html = yield fetch(url).then((res) => res.text());
            const titleRegex = /<title[^>]*>([^<]+)<\/title>/g;
            const descriptionRegex = /<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/g;
            const imageRegex = /<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/g;
            const title = ((_a = titleRegex.exec(html)) === null || _a === void 0 ? void 0 : _a[1]) || '';
            const description = ((_b = descriptionRegex.exec(html)) === null || _b === void 0 ? void 0 : _b[1]) || '';
            let image = ((_c = imageRegex.exec(html)) === null || _c === void 0 ? void 0 : _c[1]) || '';
            //if image path is relative, convert it to absolute
            if (image && image.startsWith('/')) {
                const urlObject = new URL(url);
                image = `${urlObject.protocol}//${urlObject.host}${image}`;
            }
            //console.log(`Title: ${title}`);
            //console.log(`Description: ${description}`);
            //console.log(`Image: ${image}`);
            //console.log(`Url ${url}`);
            return {
                success: true,
                data: {
                    title,
                    description,
                    image,
                    url,
                },
            };
        }
        else {
            //console.error('No valid links found in the message.');
            return {
                success: false,
                error: 'No valid links found in the message',
            };
        }
    });
}
exports.getLinkMetadata = getLinkMetadata;
