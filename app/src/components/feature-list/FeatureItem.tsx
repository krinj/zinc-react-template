import React from 'react';
import DisplayableElement from '../DisplayableElement';
import FeatureItemModel from './FeatureItemModel';


class FeatureItem extends DisplayableElement {

    private model: FeatureItemModel;

    constructor(model: FeatureItemModel) {
        super();
        this.model = model;
    }

    protected internalRender() {
        return <FeatureItemJSX {...this.model}/>;
    }
}

const FeatureItemJSX: React.FC<FeatureItemModel> = (props) => {

    let linkElement: JSX.Element | null = null;
    let linkTitle: string = props.linkText === undefined ? "Click Here" : props.linkText;

    if (props.linkUrl !== undefined) {
        linkElement = <a href={props.linkUrl}>{linkTitle}</a>
    }

    return <>
        <h4>{props.title}</h4>
        <p>
            {props.body}
        </p>
        {linkElement}

    </>
}

export default FeatureItem;
