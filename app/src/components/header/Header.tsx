import React from 'react';
import ContentBlock from '../../utils/layout/ContentBlock/ContentBlock';
import TextElement from '../text/TextElement';

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = (props) => {
    return <ContentBlock 
        elements={[new TextElement("This is Header")]}
        />;
}

export default Header;