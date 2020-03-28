import React from 'react';
import NavigationModel from './NavigationModel';
import BlockTheme from '../../utils/structure/ContentBlock/BlockTheme';


const NavBarMobile: React.FC<NavigationModel> = (props) => {
    const theme: string = BlockTheme.BASIC;
    return <div className={`mobile-nav ${theme}`}>
        New NavBarMobile
    </div>;
}

export default NavBarMobile;