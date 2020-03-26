import React from 'react';
import NavigationModel from './NavigationModel';
import NavigationLink from './NavigationLink';
import { Link } from 'react-router-dom';




const NavBarLinear: React.FC<NavigationModel> = (props) => {

    const navElements: JSX.Element[] = [];

    for (let i = 0; i < props.links.length; i++) {
        const navLink: NavigationLink = props.links[i];
        const navElement = <span className="navbar-link"><Link className="navbar-link" to={navLink.link}>{navLink.label}</Link></span>;
        navElements.push(navElement);
    }

    return <>{navElements}</>;
}

export default NavBarLinear;