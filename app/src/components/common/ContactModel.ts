import ContactType from "./ContactType";
import ContactEntry from "./ContactEntry";


interface ContactModel {

    // Primary Contact
    name?: string;
    contactItems: Map<ContactType, ContactEntry>;

}

export default ContactModel;