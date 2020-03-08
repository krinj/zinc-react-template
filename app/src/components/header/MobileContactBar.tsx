import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import ContactModel from '../common/ContactModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';


interface MobileContactBarModel {
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

const createMobileContactElement = (iconString: IconProp, body?: string): JSX.Element => {
    const iconElement: JSX.Element = <FontAwesomeIcon icon={iconString} />;
    return <div className="dev" style={{width: "100%"}}>
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

    const contactElement = createMobileContactElement("phone", props.contactModel.phoneNumber);
    const emailElement = createMobileContactElement(["far", "envelope"], props.contactModel.email);

    return <div className="dev" style={{display: "flex", justifyContent: "space-between"}}>
        {contactElement}
        <span style={{width: "1rem"}}></span>
        {emailElement}
    </div>
}

export default MobileContactBar;
