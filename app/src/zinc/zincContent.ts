// Component Imports
import ZincContentInterface from "./ZincContentInterface";
import ZincBlock from "./structure/ZincBlock";
import TextElement from "../components/text/TextElement";
import Card from "../components/card/Card";
import OpeningHours from "../components/opening-hours/OpeningHoursElement";
import ContactForm from "../components/contact-form/ContactForm";
import FeatureList from "../components/feature-list/FeatureList";
import FeatureItemModel from "../components/feature-list/FeatureItemModel";

// Media Imports
import photo1path from "../injected/images/gallery_5.png";
import squareIcon from "../injected/images/square_icon.svg";
import gallery1 from "../injected/images/gallery_1.png";
import gallery2 from "../injected/images/gallery_2.png";
import gallery3 from "../injected/images/gallery_3.png";
import gallery4 from "../injected/images/gallery_4.png";
import gallery5 from "../injected/images/gallery_5.png";
import gallery6 from "../injected/images/gallery_6.png";

// Import Font Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Gallery from "../components/gallery/Gallery";


class ZincContent extends ZincContentInterface {
    constructor () {
        super();

        library.add(faCheck);

        this.setApiEndpoint("https://api.zinccli.com/")

        this.addBody('This is injected content!');
        this.addBody('This is injected content!');
        this.addBody('This is injected content!');

        const block1 = new ZincBlock()
            .add(new TextElement("Hello World 1"))
            .add(new TextElement("Howdy! Second Text Element"))
            .add(new TextElement("Howdy! Third Text Element"));

        const block2 = new ZincBlock()
            .add(new TextElement("# This is a title \n Hello World 2 \n\n ### This **is Subtitle** and [this is link](www.google.com) \n * Yo 1\n * Yo2 \n\n\n > Blokc **quotye** `inline` \n\n ```python\nprint(HelloWorld)\n```"));

        const block3 = new ZincBlock()
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
        
        const block4 = new ZincBlock()
            .add(new ContactForm({title: "Contact Us", body: "Get a FREE quote!", requireName: true, requirePhone: true, requireNotes: true}))
            .add(featureList)


        const galleryElement = new Gallery({
            images: [
                gallery1, gallery2, gallery3, gallery4, gallery5, gallery6
            ]
        });
        const block5 = new ZincBlock()
            .add(galleryElement);

        this.page.add(block1).add(block2).add(block3).add(block4).add(block5);

    }
}

export default ZincContent

