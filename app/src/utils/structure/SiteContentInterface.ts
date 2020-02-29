import ContentPageModel from "./ContentPage/ContentPageModel";
import HeaderModel from "../../components/header/HeaderModel";

// Image Imports
import FooterModel from "../../components/footer/FooterModel";


abstract class ZincContentInterface {

    public UNDEFINED: string = "Undefined";
    public apiEndpoint: string = this.UNDEFINED;
    public page: ContentPageModel = new ContentPageModel();

    public headerModel: HeaderModel = {
        title: "Big Company Co",
        subtitle: "The place where the magic happens.",
        phone: "0823493200",
        email: "hello@bigco.com",
    };

    public footerModel: FooterModel = {
        height: 160,
        contactModel: {}
    };

    public getEndpoint(stub: string): string {
        return this.apiEndpoint + stub;
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