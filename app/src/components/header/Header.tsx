import React from 'react';
import HeaderModel from './HeaderModel';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import ContactModel from '../common/ContactModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';


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
        imageElement = <div style={{display: "flex", marginRight: "16px"}}><img src={image} className="header-logo"/></div>;
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

const createContactElement = (iconString: IconProp, text?: string): JSX.Element => {
    const iconElement: JSX.Element = <FontAwesomeIcon icon={iconString} />;
    return <div>
        <div className="btn-group" role="group" aria-label="Basic example"style={{width: "100%"}}>
            <button type="button" className="btn btn-dark btn-sm" >{iconElement}</button>
            <button type="button" 
            className="btn btn-outline-dark btn-sm" 
            style={{width: "100%", textAlign: "left", fontWeight: "bold"}}>
                {text}
            </button>
        </div>
    </div>;
}

const createContactBar = (contact: ContactModel): JSX.Element => {

    const phoneElement = createContactElement("phone", contact.phoneNumber);
    const emailElement = createContactElement(["far", "envelope"], contact.email);

    return <div className="dev col-md-5 no-padding">
        <div style={{display: "flex", height: "100%"}}>
            <div style={{marginTop: "auto", marginBottom: "auto",marginLeft: "auto", textAlign: "left", 
            display: "flex",  justifyContent: "space-evenly", flexDirection: "column", height: "100%"}}>
                {phoneElement}
                {emailElement}
            </div>
        </div>
    </div>
}

const HeaderJSX: React.FC<HeaderModel> = (props) => {

    let contactElement: JSX.Element | null = null;
    let logoCol: string = "col-md-12";
    
    if (props.showContact && props.contactModel !== undefined) {
        contactElement = createContactBar(props.contactModel);
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
