import DisplayableElement from "../DisplayableElement";

class ContentBlockModel {

    public elements: Array<DisplayableElement> = [];
    public color?: string;
    public imagePath?: string;

    constructor(color?: string, imagePath?: string) {
        this.color = color;
        this.imagePath = imagePath;
    }

    public add(element: DisplayableElement): ContentBlockModel {
        this.elements.push(element);
        return this;
    }
}

export default ContentBlockModel;