import ContentPageModel from "./ContentPage/ContentPageModel";
import HeaderModel from "../../components/header/HeaderModel";
import FooterModel from "../../components/footer/FooterModel";


interface PageMap { [key: string]: ContentPageModel; }


abstract class SiteContentInterface {

    public UNDEFINED: string = "Undefined";
    private apiEndpoint: string = this.UNDEFINED;
    public pages: PageMap = {
        index: new ContentPageModel()
    };

    public headerModel: HeaderModel = {
        title: "Default Company Header",
        subtitle: "Company Subtitle Text",
        phone: "0480500800",
        email: "hello@gmail.com",
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

    public getIndexPage() {
        return this.pages.index;
    }
}

export default SiteContentInterface