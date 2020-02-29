// Component Imports
import ZincContentInterface from "../../utils/structure/SiteContentInterface";
import ContentBlockModel from "../../utils/structure/ContentBlock/ContentBlockModel";
import Card from "../../components/card/Card";
import OpeningHours from "../../components/opening-hours/OpeningHoursElement";
import ContactForm from "../../components/contact-form/ContactForm";
import FeatureList from "../../components/feature-list/FeatureList";
import FeatureItemModel from "../../components/feature-list/FeatureItemModel";
import Gallery from "../../components/gallery/Gallery";
import Location from "../../components/location/Location";
import ContactModel from "../../components/common/ContactModel";

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



class ZincContent extends ZincContentInterface {
    constructor () {
        super();

        library.add(faCheck, faFacebookSquare);

        this.setApiEndpoint("https://api.zinccli.com/")

        const contactModel: ContactModel = {
            name: "Happy House Inc",
            facebook: {label: "HappyHouse", link: "facebook.com/happyhouse"},
            instagram: {label: "HappyHouse", link: "instagram.com/happyhouse"}
        }

        const block1 = new ContentBlockModel()
            .add(new TextSection({body: "Hello World 1"}))
            .add(new Location({
                displayAddress: "2 Park Street, Sydney, NSW",
                 mapAddress: "2 Park Street, Sydney, NSW", 
                 email: "joe@g.com", 
                 phoneNumber: "40302",
                googleApiKey: undefined}));

        const block2 = new ContentBlockModel()
            .add(new TextSection({body: "# This is a title \n Hello World 2 \n\n ### This **is Subtitle** and [this is link](www.google.com) \n * Yo 1\n * Yo2 \n\n\n > Blokc **quotye** `inline` \n\n ```python\nprint(HelloWorld)\n```"}));

        const block3 = new ContentBlockModel()
            .add(new Card({
                title: "CardT", 
                body: "Some quick example text to build on the card title and make up the bulk of the card's content.", 
                imagePath: photo1path}))
            .add(new OpeningHours({
                slots: [
                    {day: "Monday", detail: "Closed", isOpen: false},
                    {day: "Tuesday", detail: "9:00 AM to 5:00 PM", isOpen: true},
                    {day: "Wednesday", detail: "9:00 AM to 5:00 PM", isOpen: true},
                    {day: "Thursday", detail: "9:00 AM to 5:00 PM", isOpen: true},
                    {day: "Friday", detail: "9:00 AM to 5:00 PM", isOpen: true},
                    {day: "Saturday", detail: "10:00 AM to 2:00 PM", isOpen: true},
                    {day: "Sunday", detail: "Closed", isOpen: false},
                ]
            }));
        
        const featureItems: FeatureItemModel[] = [
            {title: "Property Lending", body: "Discover the home load everyone is talking about.", imagePath: squareIcon},
            {title: "Business Lending", body: "Get the best rates for business lending.", linkUrl: "www.google.com", fontIcon: "check", price: "$108"},
            {title: "Business Lending", body: "Get the best rates for business lending.", fontIcon: "check", linkUrl: "www.google.com", linkText: "Subscribe", price: "$4"},
            {title: "Business Lending", body: "Get the best rates for business lending.", fontIcon: "check", price: "$22", priceCaption: "Per Hour"}
        ]
        const featureList: FeatureList = new FeatureList({feautureItemModels: featureItems});
        
        const block4 = new ContentBlockModel()
            .add(new ContactForm({title: "Contact Us", body: "Get a FREE quote!", requireName: true, requirePhone: true, requireNotes: true}))
            .add(featureList)


        const galleryElement = new Gallery({
            images: [
                gallery1, gallery2, gallery3, gallery4, gallery5, gallery6
            ],
            imageColMd: 4
        });
        const block5 = new ContentBlockModel()
            .add(galleryElement);

        this.page.add(block1).add(block2).add(block3).add(block4).add(block5);

        this.footerModel.height = 80;
        this.footerModel.contactModel = contactModel;

    }
}

export default ZincContent

