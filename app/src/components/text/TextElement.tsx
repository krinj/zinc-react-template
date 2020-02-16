import React from 'react';
import IDisplayableElement from '../../zinc/interface/IDisplayElement';


class TextElement implements IDisplayableElement {

    private content: string = "This is some text content";

    constructor(content?: string) {
        if (content !== undefined) {
            this.content = content;
        }
    }

    render(key: string) {
        return <TextElementJSX content={this.content} key={key}/>;
    }
}

interface TextElementProps {
    content: string;
}

const TextElementJSX: React.FC<TextElementProps> = (props) => {
    return <div>Element: {props.content}</div>
}


export default TextElement;