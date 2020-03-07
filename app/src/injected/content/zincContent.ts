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
import ContactModel from "../../components/common/ContactModel";

// Import Text Content.
import sampleSection from "./text/sampleSection.md";

// Media Imports
import photo1path from "../images/gallery_5.png";
import squareIcon from "../images/square_icon.svg";
import gallery1 from "../images/gallery_1.png";
import gallery2 from "../images/gallery_2.png";
import gallery3 from "../images/gallery_3.png";
import gallery4 from "../images/gallery_4.png";
import gallery5 from "../images/gallery_5.png";
import gallery6 from "../images/gallery_6.png";

// Import Font Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import TextSection from "../../components/text-section/TextSection";
import DisplayableElement from "../../utils/structure/DisplayableElement";


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
        this.addBlock1();
        this.addBlock2();
        this.addBlock3();
        this.addBlock4();
        this.addBlock5();
    }

    private addBlock1 = (): void => {
        const textElement = new TextSection({body: "Hello World 1"})
        const locationElement = new Location({
            displayAddress: "2 Park Street, Sydney, NSW",
             mapAddress: "2 Park Street, Sydney, NSW", 
             email: "joe@g.com", 
             phoneNumber: "40302",
            googleApiKey: undefined});
        this.addElementsAsNewBlock(textElement, locationElement);
    }

    private addBlock2 = (): void => {
        const textElement = new TextSection({body: "Loading", markdownPath: sampleSection});
        this.addElementsAsNewBlock(textElement);
    }

    private addBlock3 = (): void => {
        const card = new Card({
            title: "CardT", 
            body: "Some quick example text to build on the card title and make up the bulk of the card's content.", 
            imagePath: photo1path});
        const openingHours = new OpeningHours({
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

        this.addElementsAsNewBlock(card, openingHours);
    }

    private addBlock4 = (): void => {

        const featureItems: FeatureItemModel[] = [
            {title: "Property Lending", body: "Discover the home load everyone is talking about.", imagePath: squareIcon},
            {title: "Business Lending", body: "Get the best rates for business lending.", linkUrl: "www.google.com", fontIcon: "check", price: "$108"},
            {title: "Business Lending", body: "Get the best rates for business lending.", fontIcon: "check", linkUrl: "www.google.com", linkText: "Subscribe", price: "$4"},
            {title: "Business Lending", body: "Get the best rates for business lending.", fontIcon: "check", price: "$22", priceCaption: "Per Hour"}
        ]
        const featureList: FeatureList = new FeatureList({feautureItemModels: featureItems});
        
        const contactForm = new ContactForm({
            title: "Contact Us", 
            contactFormApi: this.getEndpoint("contact"), 
            body: "Get a FREE quote!", 
            requireName: true, 
            requireEmail: true,
            requireNotes: true});
        
        this.addElementsAsNewBlock(featureList, contactForm);
    }

    private addBlock5 = (): void => {
        const galleryElement = new Gallery({
            images: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6],
            imageColMd: 4
        });

        this.addElementsAsNewBlock(galleryElement);
    }

    // ==========================================================================================
    // Common Content.
    // ==========================================================================================

    private populateContact = (): void => {
        this.setContactModel({
            name: "Company Name",
            facebook: {label: "HappyHouse", link: "facebook.com/happyhouse"},
            instagram: {label: "HappyHouse", link: "instagram.com/happyhouse"}
        });
    }

    private populateHeader = (): void => {
        this.setHeaderModel({
            title: "Default Title",
            subtitle: "Subtitle Text"
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
    }

    private registerIconLibrary = (): void => {
        library.add(faCheck, faFacebookSquare);
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

