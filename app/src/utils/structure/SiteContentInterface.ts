import ContentPageModel from "./ContentPage/ContentPageModel";
import HeaderModel from "../../components/header/HeaderModel";
import FooterModel from "../../components/footer/FooterModel";
import ContactModel from "../../components/common/ContactModel";


interface PageMap { [key: string]: ContentPageModel; }


abstract class SiteContentInterface {

    public UNDEFINED: string = "Undefined";
    public pages: PageMap = {
        index: new ContentPageModel()
    };

    private apiEndpoint: string = this.UNDEFINED;
    private contactModel: ContactModel = {};
    private headerModel: HeaderModel = {title: "Header"};
    private footerModel: FooterModel = {height: 140, contactModel: {}};

    public setContactModel = (model: ContactModel): ContactModel => {
        this.contactModel = model;
        return this.contactModel;
    }

    public getContactModel = (): ContactModel => {
        return this.contactModel;
    }

    public setHeaderModel = (model: HeaderModel): HeaderModel => {
        this.headerModel = model;
        return this.headerModel;
    }

    public getHeaderModelWithDefaultContact = (): HeaderModel => {
        return {...this.headerModel, contactModel: this.contactModel};
    }

    public setFooterModel = (model: FooterModel): FooterModel => {
        this.footerModel = model;
        return this.footerModel;
    }

    public getFooterModelWithDefaultContact = (): FooterModel => {
        return {...this.footerModel, contactModel: this.contactModel};
    }

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