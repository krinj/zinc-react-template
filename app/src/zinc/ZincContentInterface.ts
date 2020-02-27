import ZincText from "./zincText"
import ZincPage from "./structure/ZincPage";
import HeaderModel from "./interface/header/HeaderModel";

// Image Imports
import importedlogoImagePath from "../injected/images/logo.svg";
import FooterModel from "../components/footer/FooterModel";


abstract class ZincContentInterface {

    public UNDEFINED: string = "Undefined";

    public body: ZincText = new ZincText(this.UNDEFINED);
    public apiEndpoint: string = this.UNDEFINED;
    public page: ZincPage = new ZincPage();

    public headerModel: HeaderModel = {
        title: "Big Company Co",
        subtitle: "The place where the magic happens.",
        phone: "0823493200",
        email: "hello@bigco.com",
        logoImagePath: importedlogoImagePath
    };

    public footerModel: FooterModel = {
        height: 160,
        contactModel: {}
    };

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