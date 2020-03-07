import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import FeatureListModel from './FeatureListModel';
import FeatureItem from './FeatureItem';
import FeatureItemModel from './FeatureItemModel';


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
    const featureListItems: JSX.Element[] = [];

    for (let i: number = 0; i < props.feautureItemModels.length; i++) {
        const model: FeatureItemModel = props.feautureItemModels[i];
        const featureItem: FeatureItem = new FeatureItem(model);
        const wrappedElement: JSX.Element = <div key={`featureItem_${i}`}>{featureItem.render()}</div>;
        featureListItems.push(wrappedElement);
    }

    return <>
        {titleElement}
        {featureListItems}
    </>
}

export default FeatureList;
