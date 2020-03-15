import DisplayableElement from "../DisplayableElement";
import BlockTheme from "./BlockTheme";

class ContentBlockModel {

    public elements: Array<DisplayableElement> = [];
    public theme?: BlockTheme;
    public imagePath?: string;

    constructor(theme?: BlockTheme, imagePath?: string) {
        this.theme = theme;
        this.imagePath = imagePath;
    }

    public setTheme(theme: BlockTheme) {
        this.theme = theme;
    }

    public add(element: DisplayableElement): ContentBlockModel {
        this.elements.push(element);
        return this;
    }
}

export default ContentBlockModel;