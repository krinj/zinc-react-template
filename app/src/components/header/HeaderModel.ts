import ContactModel from "../common-contact/ContactModel";
import ContactType from "../common-contact/ContactType";

interface HeaderModel {
    title: string;
    contactTypesToShow: ContactType[];
    subtitle?: string;
    contactModel?: ContactModel;
    logoImagePath?: string;
}


export default HeaderModel;