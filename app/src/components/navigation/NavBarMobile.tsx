import React from 'react';
import NavigationModel from './NavigationModel';
import BlockTheme from '../../utils/structure/ContentBlock/BlockTheme';
import "../../style/navigation.scss";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const createMobileNavLinkElement = (label: string, link: string) => {
    return <div className="mobile-nav-element"><Link className="mobile-nav-link" to={link}>
        <FontAwesomeIcon icon="bars" style={{marginRight: "1rem"}}/>{label}
    </Link></div>;
}


const NavBarMobile: React.FC<NavigationModel> = (props) => {

    const theme: string = BlockTheme.BASIC;
    const navTitle = <div className="mobile-nav-title"><div className={theme}><h1>Menu</h1></div></div>

    const navElements: JSX.Element[] = [];
    for (let i: number = 0; i < props.links.length; i ++) {
        const navLink = props.links[i];
        const navElement = createMobileNavLinkElement(navLink.label, navLink.link);
        navElements.push(navElement);
    }

    return <div className={`mobile-nav ${theme}`}>
        {navTitle}
        {navElements}
    </div>;
}

export default NavBarMobile;