import ZincText from "./zincText"
import ZincPage from "./structure/ZincPage";

abstract class ZincContentInterface {

    public UNDEFINED: string = "Undefined";

    public body: ZincText = new ZincText(this.UNDEFINED);
    public apiEndpoint: string = this.UNDEFINED;
    public page: ZincPage = new ZincPage();

    public getEndpoint(stub: string): string {
        return this.apiEndpoint + stub;
    }

    public addBody(text: string) {
        this.body = new ZincText(text);
    }

    public setApiEndpoint(endpoint: string) {
        this.apiEndpoint = endpoint;
    }

    public addPage() {
        return this.page; 
    }

    public getPage() {
        return this.page;
    }

}

export default ZincContentInterface