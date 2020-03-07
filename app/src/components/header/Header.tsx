import React from 'react';
import HeaderModel from './HeaderModel';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import ContactModel from '../common/ContactModel';


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

const HeaderJSX: React.FC<HeaderModel> = (props) => {

    let contactElement: JSX.Element | null = null;
    let logoCol: string = "col-md-12";
    
    if (props.showContact && props.contactModel !== undefined) {
        const cm: ContactModel = props.contactModel;
        contactElement = <div className="dev col-md-6 no-padding">
            <p>Phone: {cm.phoneNumber} | Email: {cm.email}</p>
        </div>

        logoCol = "col-md-6";
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
