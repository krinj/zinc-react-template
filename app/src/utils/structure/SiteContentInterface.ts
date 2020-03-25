import ContentPageModel from "./ContentPage/ContentPageModel";
import HeaderModel from "../../components/header/HeaderModel";
import FooterModel from "../../components/footer/FooterModel";
import ContactModel from "../../components/common-contact/ContactModel";
import ContactType from "../../components/common-contact/ContactType";
import ContactEntry from "../../components/common-contact/ContactEntry";


interface PageMap { [key: string]: ContentPageModel; }


abstract class SiteContentInterface {

    public pages: Map<string, ContentPageModel> = new Map([[
        "index", new ContentPageModel()]  // By default, always have an index.
    ]);

    private apiEndpoint: string | undefined = undefined;
    private googleMapApiKey: string | undefined = undefined;
    private contactModel: ContactModel = {contactMap: new Map<ContactType, ContactEntry>()};
    private headerModel: HeaderModel = {title: "Header", contactTypesToShow: []};
    private footerModel: FooterModel = {height: 140, contactModel: this.contactModel, contactIconsToShow: [], contactTextToShow: []};

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

    public setGoogleMapApiKey(key: string | undefined) {
        this.googleMapApiKey = key;
    }

    public getGoogleMapApiKey() {
        return this.googleMapApiKey;
    }

    public getIndexPage(): ContentPageModel {
        const indexPage = this.pages.get("index");
        if (indexPage) {
            return indexPage;
        } else {
            throw new Error("No Index?");
        }
    }

    public createPage(key: string): ContentPageModel {
        const page: ContentPageModel = new ContentPageModel();
        this.pages.set(key, page);
        return page;
    }

    public getPages() {
        return this.pages;
    }
}

export default SiteContentInterface