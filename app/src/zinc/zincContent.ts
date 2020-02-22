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
import photo1path from "../injected/images/photo1.jpg";



class ZincContent extends ZincContentInterface {
    constructor () {
        super();

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
            {title: "Property Lending", body: "Discover the home load everyone is talking about."},
            {title: "Business Lending", body: "Get the best rates for business lending.", linkUrl: "www.google.com"},
            {title: "Business Lending", body: "Get the best rates for business lending.", linkUrl: "www.google.com", linkText: "Subscribe"}
        ]
        const featureList: FeatureList = new FeatureList({feautureItemModels: featureItems});
        
        const block4 = new ZincBlock()
            .add(new ContactForm({title: "Contact Us", body: "Get a FREE quote!", requireName: true, requirePhone: true, requireNotes: true}))
            .add(featureList)


        this.page.add(block1).add(block2).add(block3).add(block4);

    }
}

export default ZincContent

