import React from 'react';
import DisplayableElement from '../DisplayableElement';
import FooterModel from './FooterModel';
import ContactModel from '../common/ContactModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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

const FooterJSX: React.FC<FooterModel> = (props) => {

    const socialElements = [];
    const contact: ContactModel = props.contactModel;
    
    if (contact.facebook !== undefined) {
        const facebookElement = <div>
            <div style={{fontSize: "2.4em"}}><FontAwesomeIcon icon={["fab", "facebook-square"]} /></div>
            Facebook: {contact.facebook.label}
        </div>
        socialElements.push(facebookElement);
    }

    return <>
        This is a footer.
        {socialElements}
    </>
}

export default Footer;
