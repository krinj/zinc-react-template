import ContactModel from "../common-contact/ContactModel";
import ContactType from "../common-contact/ContactType";

interface LocationModel {

    title?: string;
    contactTypesToShow: ContactType[];
    mapAddress: string;
    contactModel: ContactModel;
    googleApiKey?: string;

}

export default LocationModel;