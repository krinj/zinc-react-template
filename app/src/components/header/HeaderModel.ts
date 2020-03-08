import ContactModel from "../common/ContactModel";
import ContactType from "../common/ContactType";

interface HeaderModel {
    title: string;
    contactTypesToShow: ContactType[];
    subtitle?: string;
    contactModel?: ContactModel;
    logoImagePath?: string;
}


export default HeaderModel;