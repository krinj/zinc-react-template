import ZincContentInterface from "./ZincContentInterface";
import ZincBlock from "./structure/ZincBlock";
import TextElement from "../components/text/TextElement";
import Card from "../components/card/Card";
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
            .add(new TextElement("YOYO"));

        const block4 = new ZincBlock()
            .add(new TextElement("A"))
            .add(new TextElement("B"))
            .add(new TextElement("C"))
            .add(new TextElement("D"))

        this.page.add(block1).add(block2).add(block3).add(block4);

    }
}

export default ZincContent

