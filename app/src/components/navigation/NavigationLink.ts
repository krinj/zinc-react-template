import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface NavigationLink {
    label: string;
    link: string;
    icon?: IconProp;
}

export default NavigationLink;