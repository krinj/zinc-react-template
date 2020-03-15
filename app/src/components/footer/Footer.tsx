import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import FooterModel from './FooterModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContactLibrary from '../common-contact/ContactLibrary';
import ContactType from '../common-contact/ContactType';
import ContactDefinition from '../common-contact/ContactDefinition';
import ContactEntry from '../common-contact/ContactEntry';

class Footer extends DisplayableElement {

    private model: FooterModel;

    constructor(model: FooterModel) {
        super();
        this.model = model;
    }

    protected internalRender() {
        return <FooterJSX {...this.model}/>;
    }
}

const getCopyrightText = (initialYear: number, name?: string, ): string => {
    
    const currentYear = new Date().getFullYear();
    const symbol: string = "©";
    let yearString: string;

    if (initialYear < currentYear) {
        yearString = `${initialYear} - ${currentYear}`;
    } else {
        yearString = initialYear.toString();
    }

    const copyrightText = `${symbol} ${yearString} ${name} `;
    return copyrightText;
}

const getContactTextElement = (defs: ContactDefinition[]) => {

    if (defs.length === 0) {
        return null;
    }

    const elements: JSX.Element[] = [];
    for (let i: number = 0; i < defs.length; i ++) {
        const def: ContactDefinition = defs[i];
        const element = <div key={"element" + i}><h6 className="no-margin">{def.body}</h6></div>;
        elements.push(element);
    }
    
    return <div style={{marginTop: "0.5em"}}>
        {elements}
    </div>;
}

const getContactIconElement = (defs: ContactDefinition[]) => {
    if (defs.length === 0) {
        return null;
    }

    const elements: JSX.Element[] = [];
    for (let i: number = 0; i < defs.length; i ++) {
        const def: ContactDefinition = defs[i];
        const icon: JSX.Element = <FontAwesomeIcon icon={def.icon} />;
        const element = <div key={"icon" + i}><a href={def.link} >{icon} </a></div>;
        elements.push(element);
    }
    
    return <div style={{display: "flex", height: "100%"}}>
        <div className="footer-icon-section">{elements}</div>
    </div>;
}

const FooterJSX: React.FC<FooterModel> = (props) => {

    const copyright: string = getCopyrightText(2020, props.contactModel.name);

    // Get dense contact definitions.
    const contactLib: ContactLibrary = ContactLibrary.getInstance();
    const contactMap: Map<ContactType, ContactEntry> | undefined = props.contactModel?.contactMap;

    // Get the contact definitions needed for each element.
    const contactIconDef: ContactDefinition[] = contactLib.getFilteredContactItems(props.contactIconsToShow, contactMap);
    const contactTextDef: ContactDefinition[] = contactLib.getFilteredContactItems(props.contactTextToShow, contactMap);

    // Create the elements.
    const contactTextElement = getContactTextElement(contactTextDef);
    const contactIconElement = getContactIconElement(contactIconDef);

    return <>
    <div className="row dev no-margin" style={{width: "100%"}}>
        <div className="footer-section col-md-6 dev no-padding">{copyright} {contactTextElement}</div>
        <div className="footer-section col-md-6 dev no-padding">{contactIconElement}</div>
    </div>
    </>
}

export default Footer;
