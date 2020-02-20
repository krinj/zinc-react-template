import IDisplayableElement from "../../components/IDisplayElement";

class ZincBlock {

    public elements: Array<IDisplayableElement> = [];

    public add(element: IDisplayableElement): ZincBlock {
        this.elements.push(element);
        return this;
    }

}

export default ZincBlock;