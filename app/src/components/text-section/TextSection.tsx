import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import TextSectionModel from './TextSectionModel';
import Markdown from 'markdown-to-jsx';


class TextSection extends DisplayableElement {

    private model: TextSectionModel;

    constructor(model: TextSectionModel) {
        super();
        this.model = model;
    }

    protected internalRender() {
        return <TextSectionJSX {...this.model}/>;
    }
}

const TextSectionJSX: React.FC<TextSectionModel> = (props) => {
    return <div className="dev-green"><Markdown>{props.body}</Markdown></div>
}

export default TextSection;
