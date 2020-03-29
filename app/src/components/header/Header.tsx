import React from 'react';
import HeaderModel from './HeaderModel';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import ContactLibrary from '../common-contact/ContactLibrary';
import ContactDefinition from '../common-contact/ContactDefinition';
import ContactType from '../common-contact/ContactType';
import ContactEntry from '../common-contact/ContactEntry';
import HeaderContactLink from './HeaderContactLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavigationModel from '../navigation/NavigationModel';
import NavBarMobile from '../navigation/NavBarMobile';
import "../../style/navigation.scss";


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

const createTitleElement = (title: string, subtitle?: string, image?: string, leftAligned?: boolean): JSX.Element => {

    let imageElement: JSX.Element | null = null;
    
    // Left or center align?
    let headerAlign: string = leftAligned ? "text-left" : "text-center auto-margin";

    if (image) {
        imageElement = <div style={{display: "flex", marginRight: "16px"}}><img src={image} className="header-logo" alt="logo of business"/></div>;
        if (!leftAligned) {
            headerAlign += " header-logo-margin";
        }
    }

    // Title Holder Style, left or center anchor.
    let titleHolderStyle = {margin: "auto", marginLeft: "auto"};
    if (leftAligned) {
        titleHolderStyle.marginLeft = "0";
    }

    const subtitleElement: JSX.Element | null = subtitle  ? <h5 className="headerAlign no-margin">Subtitle copy text here</h5> : null;

    return <div className="dev max-width flex">
        
        {imageElement}
        
        <div style={{display: "flex"}} className={headerAlign}>
            <div style={titleHolderStyle}>
                <h1 className="no-margin">{title}</h1>
                {subtitleElement}
            </div>
        </div>

    </div>;
}

const createContactBar = (contactDefs: ContactDefinition[]): JSX.Element => {

    const contactElements: JSX.Element[] = [];
    for (let i = 0; i < contactDefs.length; i++) {
        const contactDef: ContactDefinition = contactDefs[i];
        const e: JSX.Element = <HeaderContactLink text={contactDef.body} link={contactDef.link} icon={contactDef.icon} key={"ContactButton" + i}/>;
        contactElements.push(e);
    }

    return <div className="dev col-md-5 no-padding">
        <div style={{display: "flex", height: "100%"}}>
            <div style={{marginTop: "auto", marginBottom: "auto",marginLeft: "auto", textAlign: "left", 
            display: "flex",  justifyContent: "space-evenly", flexDirection: "column", height: "100%"}}>
                {contactElements}
            </div>
        </div>
    </div>
}

const createMobileMenu = (navigationModel: NavigationModel, isMenuActive: boolean, onDisableMenu: any) => {
    return <>
        {/* Only capture touch events, otherwise on mobile this causes a double-touch. */}
        <div className="mobile-nav-overlay" onTouchEnd={onDisableMenu}/>
        <NavBarMobile {...navigationModel} onClose={onDisableMenu} />
    </>;
}

const createMenuButton = (isMenuActive: boolean, onEnableMenu: any) => {
    return <div 
        className="dev flex clickable" 
        onTouchEnd={onEnableMenu}
        onClick={onEnableMenu}
        style={{position: "absolute", right: "0", height: "100%", minWidth: "4em"}}>
        <span className="auto-margin" style={{fontSize: "1.6em", marginRight: 0}}><FontAwesomeIcon icon={"bars"}/></span>
    </div>;
}

const HeaderJSX: React.FC<HeaderModel> = (props) => {

    let contactElement: JSX.Element | null = null;
    let logoCol: string = "col-md-12";

    const [menuActive, setMenuActive] = React.useState(false);

    // Work out whether we show navigation assets or not.
    const shouldShowNavMenu: boolean = props.isMobile && props.navigationModel ? true: false;

    // Get dense contact definitions.
    const contactLib: ContactLibrary = ContactLibrary.getInstance();
    const contactMap: Map<ContactType, ContactEntry> | undefined = props.contactModel?.contactMap;
    const contactDefs: ContactDefinition[] = contactLib.getFilteredContactItems(props.contactTypesToShow, contactMap);
    let mobileMenu: JSX.Element | null = null;

    // Support both click and touch events.

    if (props.navigationModel && menuActive) {
        mobileMenu = createMobileMenu(props.navigationModel, menuActive, () => setMenuActive(false));
    }
    
    if (contactDefs) {
        contactElement = createContactBar(contactDefs);
        logoCol = "col-md-7";
    }

    // Support both click and touch events.
    let menuButton: JSX.Element | null = null;
    if (shouldShowNavMenu) {
        menuButton = createMenuButton(menuActive, () =>  setMenuActive(true));
    }
    
    const leftAlignTitle: boolean = !props.isMobile || props.navigationModel !== undefined || props.logoImagePath !== undefined;
    return <div className="dev">
        <div className="row no-margin">

            <div className={`dev ${logoCol} no-padding flex`}>
                {createTitleElement(props.title, props.subtitle, props.logoImagePath, leftAlignTitle)}
                {menuButton}
            </div>

            {mobileMenu}
            {contactElement}
        </div>
    </div>
}

export default Header;
