import React from 'react';
import ContentBlock from '../../utils/layout/ContentBlock/ContentBlock';
import TextElement from '../text/TextElement';

interface FooterProps {
    height: number
}

const Footer: React.FC<FooterProps> = (props) => {
    return <ContentBlock 
        elements={[new TextElement("This is Footer")]} 
        height={props.height}/>;
}

export default Footer;