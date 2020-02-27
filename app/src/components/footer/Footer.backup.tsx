import React from 'react';
import ContentBlock from '../../utils/layout/ContentBlock/ContentBlock';
import TextElement from '../text/TextElement';
import ContactModel from '../common/ContactModel';

interface FooterProps {
    height: number
    contactModel: ContactModel
}



const Footer: React.FC<FooterProps> = (props) => {
    return <ContentBlock 
        elements={[new TextElement("This is Footer")]} 
        height={props.height}/>;
}

export default Footer;