import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import FeatureListModel from './FeatureListModel';
import FeatureItem from './FeatureItem';
import FeatureItemModel from './FeatureItemModel';
import Markdown from 'markdown-to-jsx';


class FeatureList extends DisplayableElement {

    private model: FeatureListModel;

    constructor(model: FeatureListModel) {
        super();
        this.model = model;
    }

    protected internalRender() {
        return <FeatureListJSX {...this.model}/>;
    }
}

const FeatureListJSX: React.FC<FeatureListModel> = (props) => {

    const titleElement: JSX.Element | null = props.title ? <h2>{props.title}</h2> : null;
    const bodyElement: JSX.Element | null = props.body ? <Markdown>{props.body}</Markdown> : null;
    const featureListItems: JSX.Element[] = [];

    // Get the individual feature items.
    for (let i: number = 0; i < props.feautureItemModels.length; i++) {
        const model: FeatureItemModel = props.feautureItemModels[i];
        const featureItem: FeatureItem = new FeatureItem(model);
        const wrappedElement: JSX.Element = <div className="feature-item bottom-border" key={`featureItem_${i}`}>{featureItem.render()}</div>;
        featureListItems.push(wrappedElement);
    }

    // Wrap it in a card?
    let renderElements: JSX.Element = <>{titleElement}{bodyElement}{featureListItems}</>;
    if (props.withCard) {
        renderElements = <div className="card"><div className="card-body">{renderElements}</div></div>;
    }

    return renderElements;
}

export default FeatureList;
