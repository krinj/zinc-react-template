import FeatureItemModel from "./FeatureItemModel";

interface FeatureListModel {
    title?: string;
    body?: string;
    feautureItemModels: FeatureItemModel[];
    withCard?: boolean;
}

export default FeatureListModel;