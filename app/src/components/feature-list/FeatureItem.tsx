import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import FeatureItemModel from './FeatureItemModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Markdown from 'markdown-to-jsx';


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

    const iconElement: JSX.Element | null = props.icon === undefined ? null : <FontAwesomeIcon icon={props.icon} />
    let priceLabel: JSX.Element | null = null;

    if (props.price !== undefined) {
        priceLabel = <div>
            <h3>{props.price}</h3>
            <span>{props.priceCaption}</span>
        </div>
    }

    const leftSection = <div style={{width: "64px", display: "flex"}} className="text-center">
        <div style={{fontSize: "1.4em", margin: "auto"}}>{iconElement}</div>
    </div>

    const centralSection = <div style={{flexGrow: 1, display: "flex"}}>
        <div>
            <h4>{props.title}</h4>
            <span><Markdown>{props.body}</Markdown></span>
        </div>
    </div>;

    const rightSection = <div style={{width: "92px", display: "flex"}} className="text-left">
        <div style={{width: "100%"}}>{priceLabel}</div>
    </div>;

    return <>
        <div style={{display: "flex"}}>

            {leftSection}
            {centralSection}
            {rightSection}

        </div> 
    </>
}

export default FeatureItem;
