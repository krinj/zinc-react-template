import React from 'react';
import HeaderModel from './HeaderModel';
import BlockTheme from '../../utils/structure/ContentBlock/BlockTheme';
import Navigation from '../navigation/Navigation';
import MobileContactBar from './MobileContactBar';
import Header from './Header';
import ContactType from '../common-contact/ContactType';
import ContentBlockModel from '../../utils/structure/ContentBlock/ContentBlockModel';
import ContentBlock from '../../utils/structure/ContentBlock/ContentBlock';
import wrapWithContentBlock from '../../utils/structure/ContentBlock/wrapWithContentBlock';


const HeaderWrapper: React.FC<HeaderModel> = (props) => {

    const mobileWidthBreakPoint = 768;
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= mobileWidthBreakPoint);

    React.useEffect(() => {
        window.addEventListener("resize", () => {setIsMobile(window.innerWidth <= mobileWidthBreakPoint)} );
    }, []);

    let headerBlock = null;
    let mobileContactBlock = null;
    let navigationBlock = null;
    const headerContentBlocks = [];

    // Only show the main contact bar if it's not on mobile.
    const headerContactsToShow: ContactType[] | undefined = isMobile ? [] : props.contactTypesToShow;
    const header = new Header({...props, contactTypesToShow: headerContactsToShow, isMobile: isMobile});
    headerBlock = wrapWithContentBlock(header, props.theme);

    // If there is a navigation block.
    if (props.navigationModel && !isMobile) {
        const navStyle: object = {paddingTop: "0.8em", paddingBottom: "0.8em"};
        navigationBlock = wrapWithContentBlock(new Navigation(props.navigationModel), BlockTheme.INVERTED, "navbar", navStyle);
    }

    // If it's on mobile, we'll use a separate contact block.
    if (isMobile && props.contactTypesToShow && props.contactModel) {
        const mobileContactBar = new MobileContactBar({
            contactTypesToShow: props.contactTypesToShow, 
            contactModel: props.contactModel});

        mobileContactBlock = wrapWithContentBlock(mobileContactBar, props.theme);
    }

    // If the header has additional content blocks.
    if (props.blocks) {
        for (let i: number = 0; i < props.blocks.length; i++) {
            const model: ContentBlockModel = props.blocks[i];
            const element: JSX.Element = <ContentBlock elements={model.elements} 
            key={i} theme={model.theme} backgroundImagePath={model.imagePath}/>
            headerContentBlocks.push(element);
        }
    }
    
    const fullyWrappedHeader = <header style={{position: "relative"}}>
            <div className="header-placer"></div> 
            {headerBlock}
            {navigationBlock}
            {mobileContactBlock}
            {headerContentBlocks}
    </header>;

    return fullyWrappedHeader;
}

export default HeaderWrapper;