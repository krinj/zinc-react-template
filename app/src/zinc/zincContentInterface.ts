import ZincText from "./zincText"

abstract class ZincContentInterface {

    public UNDEFINED: string = "Undefined";

    public body: ZincText = new ZincText(this.UNDEFINED);
    public apiEndpoint: string = this.UNDEFINED;

    public getEndpoint(stub: string): string {
        return this.apiEndpoint + stub;
    }

    public addBody(text: string) {
        this.body = new ZincText(text);
    }

    public setApiEndpoint(endpoint: string) {
        this.apiEndpoint = endpoint;
    }

}

export default ZincContentInterface