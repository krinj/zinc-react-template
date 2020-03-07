import ContactModel from "../common/ContactModel";

interface HeaderModel {
    title: string;
    subtitle?: string;
    contactModel?: ContactModel;
    logoImagePath?: string;
}

export default HeaderModel;