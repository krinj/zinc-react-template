import ZincContentInterface from "./zincContentInterface";

class ZincContent extends ZincContentInterface {
    constructor () {
        super();

        this.setApiEndpoint("https://api.zinccli.com/")

        this.addBody('This is injected content!');
        this.addBody('This is injected content!');
        this.addBody('This is injected content!');

    }
}

export default ZincContent

