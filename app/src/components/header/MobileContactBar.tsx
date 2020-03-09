import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import ContactModel from '../common-contact/ContactModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ContactLibrary from '../common-contact/ContactLibrary';
import ContactType from '../common-contact/ContactType';
import ContactDefinition from '../common-contact/ContactDefinition';
import ContactEntry from '../common-contact/ContactEntry';


interface MobileContactBarModel {
    contactTypesToShow?: ContactType[];
    contactModel: ContactModel;
}

class MobileContactBar extends DisplayableElement {

    private model: MobileContactBarModel;

    constructor(model: MobileContactBarModel) {
        super();
        this.model = model;
    }

    protected internalRender() {
        return <MobileContactBarJSX {...this.model}/>;
    }
}

const createMobileContactElement = (iconString: IconProp, key: string, body?: string): JSX.Element => {
    const iconElement: JSX.Element = <FontAwesomeIcon icon={iconString} />;
    return <div className="dev" style={{width: "100%"}} key={key}>
        <div className="btn-group" role="group" aria-label="Basic example"style={{width: "100%"}}>
            <button type="button" className="btn btn-dark btn-sm" >{iconElement}</button>
            <button type="button" 
            className="btn btn-outline-dark btn-sm" 
            style={{width: "100%", textAlign: "left", fontWeight: "bold"}}>
                {body}
            </button>
        </div>
        
    </div>;
}

const MobileContactBarJSX: React.FC<MobileContactBarModel> = (props) => {

    // Get dense contact definitions.
    const contactLib: ContactLibrary = ContactLibrary.getInstance();
    const contactMap: Map<ContactType, ContactEntry> | undefined = props.contactModel?.contactMap;
    const contactDefs: ContactDefinition[] = contactLib.getFilteredContactItems(props.contactTypesToShow, contactMap);

    // Loop through and create a contact element for each one.
    const contactElements: JSX.Element[] = [];
    if (contactDefs) {
        for (let i: number = 0; i < contactDefs.length; i++) {

            if (i > 0) {
                const spacer: JSX.Element = <span style={{width: "1rem"}} key={`spacer${i}`}></span>;
                contactElements.push(spacer);
            }

            const contactDef: ContactDefinition = contactDefs[i];
            const element: JSX.Element = createMobileContactElement(contactDef.icon, `contactElement${i}`, contactDef.body);
            contactElements.push(element);
        }
    }

    return <div className="dev" style={{display: "flex", justifyContent: "space-between"}}>
        {contactElements}
    </div>
}

export default MobileContactBar;
