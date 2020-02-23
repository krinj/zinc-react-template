import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface FeatureItemModel {

    title: string;
    body?: string;

    imagePath?: string;
    fontIcon?: IconProp;

    linkUrl?: string;
    linkText?: string;
    
    // Pricing
    price?: string;
    priceCaption?: string;

}

export default FeatureItemModel;