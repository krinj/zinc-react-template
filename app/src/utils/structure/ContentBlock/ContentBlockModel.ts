import DisplayableElement from "../DisplayableElement";

class ContentBlockModel {

    public elements: Array<DisplayableElement> = [];

    public add(element: DisplayableElement): ContentBlockModel {
        this.elements.push(element);
        return this;
    }

}

export default ContentBlockModel;