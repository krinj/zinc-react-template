import DisplayableElement from "../DisplayableElement";

class ContentBlockModel {

    public elements: Array<DisplayableElement> = [];
    public color?: string;

    constructor(color?: string) {
        this.color = color;
    }

    public add(element: DisplayableElement): ContentBlockModel {
        this.elements.push(element);
        return this;
    }

}

export default ContentBlockModel;