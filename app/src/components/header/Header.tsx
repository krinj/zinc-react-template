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

const HeaderJSX: React.FC<HeaderModel> = (props) => {

    let contactElement: JSX.Element | null = null;
    
    if (props.contactModel !== undefined) {
        const cm: ContactModel = props.contactModel;
        contactElement = <p>Phone: {cm.phoneNumber} | Email: {cm.email}</p>
    }

    return <div>
        
        <img src={props.logoImagePath}/>
        <h1>{props.title}</h1>
        <h3>{props.subtitle}</h3>
        <p>{contactElement}</p>

    </div>
}

export default Header;
