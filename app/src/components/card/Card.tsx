import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import CardModel from './CardModel';
import Markdown from 'markdown-to-jsx';
import CallToActionButton from '../common/CallToActionButton';


class Card extends DisplayableElement {

    private model: CardModel;

    constructor(model: CardModel) {
        super();
        this.model = model;
    }

    protected internalRender() {
        return <CardJSX {...this.model}/>;
    }
}

const CardJSX: React.FC<CardModel> = (props) => {

    const imageElement: JSX.Element | null = props.imagePath ? <img className="card-img-top" src={props.imagePath} alt={props.imageAlt} /> : null;
    const titleElement: JSX.Element | null = props.title ? <h5 className="card-title">{props.title}</h5> : null;
    const bodyElement: JSX.Element | null = props.body ? <p className="card-text"><Markdown>{props.body}</Markdown></p> : null;
    const callToActionElement: JSX.Element | null = props.callToActionLink ?
        <CallToActionButton label={props.callToActionLabel} link={props.callToActionLink} extraClass="btn-sm"/> : null;

    return <div>
        <div className="card">
            {imageElement}
            <div className="card-body">
                {titleElement}
                {bodyElement}
                {callToActionElement}
            </div>
        </div>
    </div>
}

export default Card;

