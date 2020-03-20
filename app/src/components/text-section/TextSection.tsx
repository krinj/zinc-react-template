import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import TextSectionModel from './TextSectionModel';
import Markdown from 'markdown-to-jsx';
import CallToActionButton from '../common/CallToActionButton';


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

    let classString: string = "dev";

    const style = {
        minHeight: props.minHeight ? `${props.minHeight}px` : undefined,
        display: "flex"
    };

    if (props.centered) {
        classString += " text-center";
    }

    if (props.classOverride) {
        classString += " " + props.classOverride;
    }

    if (props.markdownPath !== undefined && !isLoaded) {
        fetch(props.markdownPath)
        .then(x => x.text())
        .then(x => {
            setBody(x);
            setIsLoaded(true);
        });
    }

    const callToActionElement: JSX.Element | null = props.callToActionLink ?
        <div style={{marginTop: "2rem"}}>
            <CallToActionButton label={props.callToActionLabel} link={props.callToActionLink} extraClass="btn-lg" />
        </div> :
        null;

    return <div className={classString} style={style}>
        <div style={{margin: "auto"}}>
            <Markdown>{body}</Markdown>
            {callToActionElement}
        </div>
    </div>
}

export default TextSection;
