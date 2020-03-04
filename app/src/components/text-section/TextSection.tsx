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

    const [body, setBody] = React.useState(props.body);
    const [isLoaded, setIsLoaded] = React.useState(false);

    if (props.markdownPath !== undefined && !isLoaded) {
        fetch(props.markdownPath)
        .then(x => x.text())
        .then(x => {
            setBody(x);
            setIsLoaded(true);
        });
    }

    return <div className="dev-green"><Markdown>{body}</Markdown></div>
}

export default TextSection;
