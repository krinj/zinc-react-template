import ContactModel from "../common-contact/ContactModel";
import ContactType from "../common-contact/ContactType";
import BlockTheme from "../../utils/structure/ContentBlock/BlockTheme";

interface HeaderModel {
    title: string;
    contactTypesToShow: ContactType[];
    subtitle?: string;
    contactModel?: ContactModel;
    logoImagePath?: string;
    theme?: BlockTheme;
}


export default HeaderModel;