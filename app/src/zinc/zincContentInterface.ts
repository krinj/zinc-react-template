import ZincText from "./zincText"

abstract class ZincContentInterface {

    public body: ZincText = new ZincText("Undefined");

    public addBody(text: string) {
        this.body = new ZincText(text);
    }

}

export default ZincContentInterface