import ContactModel from "../common-contact/ContactModel";
import ContactType from "../common-contact/ContactType";
import BlockTheme from "../../utils/structure/ContentBlock/BlockTheme";

interface FooterModel {
    height: number;
    contactModel: ContactModel;
    contactTextToShow: ContactType[];
    contactIconsToShow: ContactType[];
    theme?: BlockTheme;
}

export default FooterModel;