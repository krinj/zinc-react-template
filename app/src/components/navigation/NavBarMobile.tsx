import React from 'react';
import NavigationModel from './NavigationModel';
import BlockTheme from '../../utils/structure/ContentBlock/BlockTheme';
import "../../style/navigation.scss";
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface LinkElementProps {
    label: string; 
    link: string; 
    onClose?: () => void;
}

const LinkElement: React.FC<LinkElementProps> = (props) => {

    // If the link is a match, we just close the menu instead.
    const routeMatch: any = useRouteMatch(props.link);
    const onClose: any = routeMatch ?  props.onClose : null;

    return <div className="mobile-nav-element">
        <Link className="mobile-nav-link" to={props.link} onMouseDown={onClose}>
        <FontAwesomeIcon icon="bars" style={{marginRight: "1rem"}}/>{props.label}
    </Link></div>;
}


const NavBarMobile: React.FC<NavigationModel> = (props) => {


    const theme: string = BlockTheme.BASIC;
    const navTitle = <div className="mobile-nav-title flex max-width">
        <div className={theme + " max-width"}><h1 className="no-margin">Menu</h1></div>
        <div className={theme + " flex clickable"} onMouseDown={props.onClose} style={{minWidth: "3em"}}>
            <FontAwesomeIcon icon="times" style={{fontSize: "1.3em", margin: "auto", marginRight: "0"}} />
        </div>
    </div>

    const navElements: JSX.Element[] = [];
    for (let i: number = 0; i < props.links.length; i ++) {
        const navLink = props.links[i];
        const navElement = <LinkElement key={`navItem_${i}`} label={navLink.label} link={navLink.link} onClose={props.onClose} />
        navElements.push(navElement);
    }

    return <div className={`mobile-nav mobile-nav-menu-show ${theme}`}>
        {navTitle}
        {navElements}
    </div>;
}

export default NavBarMobile;