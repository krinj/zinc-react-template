import ZincContentInterface from "./ZincContentInterface";
import ZincBlock from "./structure/ZincBlock";
import TextElement from "../components/text/TextElement";

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
            .add(new TextElement("Hello World 2"));

        const block3 = new ZincBlock()
            .add(new TextElement("Hello World 3"));

        this.page.add(block1).add(block2).add(block3);

    }
}

export default ZincContent

