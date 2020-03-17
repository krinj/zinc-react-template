import React from 'react';
import HeaderModel from './HeaderModel';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import ContactLibrary from '../common-contact/ContactLibrary';
import ContactDefinition from '../common-contact/ContactDefinition';
import ContactType from '../common-contact/ContactType';
import ContactEntry from '../common-contact/ContactEntry';
import HeaderContactLink from './HeaderContactLink';


class Header extends DisplayableElement {

    private model: HeaderModel;
    
    constructor(model: HeaderModel) {
        super();
        this.model = model;
    }

    protected internalRender() {
        return <HeaderJSX {...this.model}/>;
    }
}

const createLogoElement = (title: string, image?: string): JSX.Element => {

    let imageElement: JSX.Element | null = null;
    let headerTitleClass: string = "header-title";

    if (image) {
        headerTitleClass += " header-logo-margin";
        imageElement = <div style={{display: "flex", marginRight: "16px"}}><img src={image} className="header-logo" alt="logo of business"/></div>;
    }

    return <div className="dev" style={{display: "flex"}}>
        
        {imageElement}
        <div style={{display: "flex"}} className={headerTitleClass}>
            <div style={{margin: "auto"}}>
                <h1 className="no-margin">{title}</h1>
                <h5 className="no-margin">Subtitle copy text here</h5>
            </div>
            
        </div>
    </div>;
}

const createContactBar = (contactDefs: ContactDefinition[]): JSX.Element => {

    const contactElements: JSX.Element[] = [];
    for (let i = 0; i < contactDefs.length; i++) {
        const contactDef: ContactDefinition = contactDefs[i];
        const e: JSX.Element = <HeaderContactLink text={contactDef.body} link={contactDef.link} icon={contactDef.icon} key={"ContactButton" + i}/>;
        contactElements.push(e);
    }

    return <div className="dev col-md-5 no-padding">
        <div style={{display: "flex", height: "100%"}}>
            <div style={{marginTop: "auto", marginBottom: "auto",marginLeft: "auto", textAlign: "left", 
            display: "flex",  justifyContent: "space-evenly", flexDirection: "column", height: "100%"}}>
                {contactElements}
            </div>
        </div>
    </div>
}

const HeaderJSX: React.FC<HeaderModel> = (props) => {

    let contactElement: JSX.Element | null = null;
    let logoCol: string = "col-md-12";

    // Get dense contact definitions.
    const contactLib: ContactLibrary = ContactLibrary.getInstance();
    const contactMap: Map<ContactType, ContactEntry> | undefined = props.contactModel?.contactMap;
    const contactDefs: ContactDefinition[] = contactLib.getFilteredContactItems(props.contactTypesToShow, contactMap);
    
    if (contactDefs) {
        contactElement = createContactBar(contactDefs);
        logoCol = "col-md-7";
    }

    return <div className="dev">
        <div className="row no-margin">

            <div className={`dev ${logoCol} no-padding`}>
                {createLogoElement(props.title, props.logoImagePath)}
            </div>

            {contactElement}
        </div>
    </div>
}

export default Header;
