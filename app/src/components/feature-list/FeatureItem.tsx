import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import FeatureItemModel from './FeatureItemModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Markdown from 'markdown-to-jsx';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import "../../style/featurelist.scss";


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

const createIconElement = (icon?: IconProp): JSX.Element | null => {

    if (icon) {
        return <div style={{width: "48px", display: "flex", marginRight: "0.5em"}} className="text-center">
            <div style={{fontSize: "1.2em", margin: "auto"}}>{<FontAwesomeIcon icon={icon} />}</div>
        </div>
    }

    return null;
}

const createPriceElement = (price?: string, rate?: string) => {

    if (price) {
        const priceLabel = <div style={{display: "flex", height: "100%"}}>
            <div style={{margin: "auto"}}>
                <h4 className="no-margin">{price}</h4>
                <small>{rate}</small>
            </div>
        </div>;

        return <div style={{width: "84px", display: "flex"}} className="dev text-center">
            <div style={{width: "100%"}}>{priceLabel}</div>
        </div>;
    }
    return null;
}

const createBodyElement = (title: string, body?: string) => {
    return <div style={{display: "flex", width: "100%", marginRight: "0.5em"}}>
        <div>
            <h5>{title}</h5>
            <Markdown>{body}</Markdown>
        </div>
    </div>;
}

const FeatureItemJSX: React.FC<FeatureItemModel> = (props) => {

    const leftSection = createIconElement(props.icon);
    const centralSection = createBodyElement(props.title, props.body);
    const rightSection = createPriceElement(props.price, props.priceCaption);

    return <div className="dev" style={{display: "flex"}}>
        {leftSection}
        {centralSection}
        {rightSection}
    </div> 
}

export default FeatureItem;
