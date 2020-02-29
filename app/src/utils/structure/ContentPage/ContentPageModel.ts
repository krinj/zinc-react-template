import ContentBlockModel from "../ContentBlock/ContentBlockModel";

class ContentPageModel {

    public blocks: Array<ContentBlockModel> = [];

    public add(block: ContentBlockModel): ContentPageModel {
        this.blocks.push(block);
        return this;
    }

}

export default ContentPageModel;