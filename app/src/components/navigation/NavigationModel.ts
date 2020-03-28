import NavigationLink from "./NavigationLink";

interface NavigationModel {
    links: NavigationLink[];
    onClose?(): void;
}

export default NavigationModel;