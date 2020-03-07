import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface FeatureItemModel {

    // Text
    title: string;
    body?: string;

    // Image
    icon?: IconProp;

    // Pricing
    price?: string;
    priceCaption?: string;

}

export default FeatureItemModel;