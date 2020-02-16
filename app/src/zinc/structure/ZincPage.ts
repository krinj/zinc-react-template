import ZincBlock from "./ZincBlock";

class ZincPage {

    public blocks: Array<ZincBlock> = [];

    public add(block: ZincBlock): ZincPage {
        this.blocks.push(block);
        return this;
    }

}

export default ZincPage;