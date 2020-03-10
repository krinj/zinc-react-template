// Component Imports
import SiteContentInterface from "../../utils/structure/SiteContentInterface";
import ContentBlockModel from "../../utils/structure/ContentBlock/ContentBlockModel";
import Card from "../../components/card/Card";
import OpeningHours from "../../components/opening-hours/OpeningHoursElement";
import ContactForm from "../../components/contact-form/ContactForm";
import FeatureList from "../../components/feature-list/FeatureList";
import FeatureItemModel from "../../components/feature-list/FeatureItemModel";
import Gallery from "../../components/gallery/Gallery";
import Location from "../../components/location/Location";

// Import Text Content.
import sampleSection from "./text/sampleSection.md";

// Media Imports
import logo from "../images/logo.svg";
import gallery1 from "../images/gallery_1.png";
import gallery2 from "../images/gallery_2.png";
import gallery3 from "../images/gallery_3.png";
import gallery4 from "../images/gallery_4.png";
import gallery5 from "../images/gallery_5.png";
import gallery6 from "../images/gallery_6.png";

// Import Font Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faPhone, faUser, faTimes, faInfo} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, } from '@fortawesome/free-regular-svg-icons';
import { faFacebookSquare, faFacebook } from '@fortawesome/free-brands-svg-icons';
import TextSection from "../../components/text-section/TextSection";
import DisplayableElement from "../../utils/structure/DisplayableElement";
import ContactLibrary from "../../components/common-contact/ContactLibrary";
import ContactType from "../../components/common-contact/ContactType";
import ContactEntry from "../../components/common-contact/ContactEntry";


class ZincContent extends SiteContentInterface {
    constructor () {
        super();
        
        this.registerIconLibrary();
        this.populateApi();
        this.populateContact();
        this.populateHeader();
        this.populateFooter();
        this.addCustomContent();
    }

    // ==========================================================================================
    // Custom Content Content.
    // ==========================================================================================

    private addCustomContent = (): void => {
        this.addBlockWithForm();
        this.addBlock2();
        this.addBlockGallery();
        this.addBlockCenteredText();
        this.addBlockWithCards();
        this.addBlockWithHoursAndLocation();
        this.addBlockWithFeatures();
    }

    private addBlockWithForm = (): void => {

        const textBody: string = 

        "## Simple Text Section \n Here is a simple text section. You can enter any plain string here. \n"+
        "You can also use [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to do some basic formatting. \n\n" +
        "* Example 1 \n* Example 2 \n* Example 3 \n\n";

        const textElement = new TextSection({body: textBody})

        const contactForm = new ContactForm({
            title: undefined, 
            contactFormApi: this.getEndpoint("contact"), 
            subtitle: "Get a FREE quote!",
            body: "Please enter your details below and our team will get back to you with more information.", 
            requireName: true, 
            requireEmail: true,
            requireNotes: true
        });
        
        this.addElementsAsNewBlock(textElement, contactForm);
    }

    private addBlock2 = (): void => {
        const textElement = new TextSection({body: "Loading", markdownPath: sampleSection});
        this.addElementsAsNewBlock(textElement);
    }

    private addBlockWithCards = (): void => {
        const card = new Card({
            title: "Card Title", 
            body: "**This is a simple card element.** Markdown is also enabled on this body section.",
            imagePath: "https://placekeanu.com/320/200/",
            callToActionLink: "https://google.com"
        });

        this.addElementsAsNewBlock(card, card, card);
    }

    private addBlockWithHoursAndLocation = (): void => {

        const openingHours = new OpeningHours({
            showPublicHolidayMessage: true,
            slots: [
                {day: "Monday", detail: "Closed", isOpen: false},
                {day: "Tuesday", detail: "9:00 AM to 5:00 PM", isOpen: true},
                {day: "Wednesday", detail: "9:00 AM to 5:00 PM", isOpen: true},
                {day: "Thursday", detail: "9:00 AM to 5:00 PM", isOpen: true},
                {day: "Friday", detail: "9:00 AM to 5:00 PM", isOpen: true},
                {day: "Saturday", detail: "10:00 AM to 2:00 PM", isOpen: true},
                {day: "Sunday", detail: "Closed", isOpen: false},
            ]
        });

        const locationElement = new Location({
            title: "Our Location",
            displayAddress: "2 Park Street\n2000\nSydney, NSW",
            mapAddress: "2 Park Street, Sydney, NSW", 
            contactModel: this.getContactModel(),
            googleApiKey: this.getGoogleMapApiKey()});

        this.addElementsAsNewBlock(openingHours, locationElement);
    }

    private addBlockWithFeatures = (): void => {

        const itemBody: string = "This is the **feature body** text with MD support.";
        
        const featureItems: FeatureItemModel[] = [
            {title: "Feature One", body: itemBody, price: "$99"},
            {title: "Feature Two", body: itemBody, price: "$99"},
            {title: "Feature Three", body: itemBody, price: "$99", priceCaption: "per hour"},
            {title: "Feature Four", body: itemBody, price: "$99", priceCaption: "per day"},
        ]

        const featureList: FeatureList = new FeatureList({
            title: "Priced Features",
            feautureItemModels: featureItems
        });

        const featureItemsWithIcon: FeatureItemModel[] = [
            {title: "Feature One", body: itemBody, icon: faCheck},
            {title: "Feature Two", body: itemBody, icon: faCheck},
            {title: "Feature Three", body: itemBody, icon: faCheck},
            {title: "Feature Four", body: itemBody, icon: faCheck},
        ]

        const featureListWithIcon: FeatureList = new FeatureList({
            title: "Icon Features",
            feautureItemModels: featureItemsWithIcon
        });
 
        this.addElementsAsNewBlock(featureList, featureListWithIcon);
    }

    private addBlockGallery = (): void => {
        const galleryElement = new Gallery({
            images: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6],
            imageColMd: 3
        });

        this.addElementsAsNewBlock(galleryElement);
    }

    private addBlockCenteredText = (): void => {
        const textElement = new TextSection({
            body: "## Call To Action \n\n ##### Text can also be centered for impact.",
            centered: true,
            minHeight: 240,
            callToActionLink: "https://google.com",
            callToActionLabel: "Press Me!"
        });

        this.addElementsAsNewBlock(textElement);
    }

    // ==========================================================================================
    // Common Content.
    // ==========================================================================================

    private populateContact = (): void => {

        const contactMap: Map<ContactType, ContactEntry> = new Map<ContactType, ContactEntry>();
        contactMap.set(ContactType.EMAIL, {body: "hello@company.com", link: "mailto: hello@company.com"});
        contactMap.set(ContactType.PHONE, {body: "0439003200", link: "tel: 0439003200"});
        contactMap.set(ContactType.FACEBOOK, {body: "MyFacebook", link: "https://facebook.com"});
        contactMap.set(ContactType.ADDRESS, {body: "2 Park Street", link: "2 Park Street"});

        this.setContactModel({
            name: "Company Name",
            contactMap: contactMap
        });
    }

    private populateHeader = (): void => {
        this.setHeaderModel({
            title: "Default Title",
            subtitle: "Subtitle Text",
            logoImagePath: logo,
            contactTypesToShow: [ContactType.PHONE, ContactType.EMAIL]
        })
    }

    private populateFooter = (): void => {
        this.setFooterModel({
            height: 120,
            contactModel: this.getContactModel()
        })
    }

    private populateApi = (): void => {
        this.setApiEndpoint("https://api.zinccli.com/");
        this.setGoogleMapApiKey(undefined);
    }

    private registerIconLibrary = (): void => {

        library.add(faCheck, faPhone, faEnvelope, faFacebookSquare, faUser, faTimes);
        library.add(faInfo);

        // Set the icons that we need for our contact library.
        const contactLibrary: ContactLibrary = ContactLibrary.getInstance();
        contactLibrary.setLabelAndIcon(ContactType.NAME, "Name", faUser);
        contactLibrary.setLabelAndIcon(ContactType.PHONE, "Phone", faPhone);
        contactLibrary.setLabelAndIcon(ContactType.EMAIL, "Email", faEnvelope);
        contactLibrary.setLabelAndIcon(ContactType.FACEBOOK, "Facebook", faFacebookSquare);
    }

    // ==========================================================================================
    // Utility.
    // ==========================================================================================

    private createNextBlock = (color?: string): ContentBlockModel => {
        const block = new ContentBlockModel(color);
        this.getIndexPage().add(block);
        return block;
    }

    private addElementsAsNewBlock = (...elements: DisplayableElement[]) => {
        const block = this.createNextBlock();
        elements.forEach(e => block.add(e));
    }
}

export default ZincContent

