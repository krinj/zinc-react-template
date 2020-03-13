import ContactModel from "../common-contact/ContactModel";
import ContactType from "../common-contact/ContactType";

interface FooterModel {
    height: number;
    contactModel: ContactModel;
    contactTextToShow: ContactType[];
    contactIconsToShow: ContactType[];
}

export default FooterModel;