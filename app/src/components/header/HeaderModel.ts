import ContactModel from "../common-contact/ContactModel";
import ContactType from "../common-contact/ContactType";
import BlockTheme from "../../utils/structure/ContentBlock/BlockTheme";
import ContentBlockModel from "../../utils/structure/ContentBlock/ContentBlockModel";

interface HeaderModel {
    title: string;
    contactTypesToShow: ContactType[];
    subtitle?: string;
    contactModel?: ContactModel;
    logoImagePath?: string;
    theme?: BlockTheme;
    blocks?: ContentBlockModel[];
}


export default HeaderModel;