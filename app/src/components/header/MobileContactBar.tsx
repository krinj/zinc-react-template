import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import ContactModel from '../common-contact/ContactModel';
import ContactLibrary from '../common-contact/ContactLibrary';
import ContactType from '../common-contact/ContactType';
import ContactDefinition from '../common-contact/ContactDefinition';
import ContactEntry from '../common-contact/ContactEntry';
import HeaderContactLink from './HeaderContactLink';


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
            const element: JSX.Element = <HeaderContactLink text={contactDef.body} link={contactDef.link} icon={contactDef.icon} key={"ContactButton" + i}/>
            contactElements.push(element);
        }
    }

    return <div className="dev" style={{display: "flex", justifyContent: "space-between"}}>
        {contactElements}
    </div>
}

export default MobileContactBar;
