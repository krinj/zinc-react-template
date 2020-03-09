import ContactModel from "../common-contact/ContactModel";

interface LocationModel {

    title?: string;
    displayAddress: string;
    mapAddress: string;
    contactModel: ContactModel;
    googleApiKey?: string;

}

export default LocationModel;