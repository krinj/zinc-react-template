import React from 'react';
import Header from '../../../components/header/Header';
import wrapWithContentBlock from '../ContentBlock/wrapWithContentBlock';
import HeaderModel from '../../../components/header/HeaderModel';
import FooterModel from '../../../components/footer/FooterModel';
import Footer from '../../../components/footer/Footer';
import ContentBlock from '../ContentBlock/ContentBlock';
import MobileContactBar from '../../../components/header/MobileContactBar';
import ContactType from '../../../components/common-contact/ContactType';
import ContentBlockModel from '../ContentBlock/ContentBlockModel';
import Navigation from '../../../components/navigation/Navigation';
import BlockTheme from '../ContentBlock/BlockTheme';


interface ContentPageProps {
    contentBlocks: Array<React.ReactElement>;
    headerModel?: HeaderModel;
    footerModel?: FooterModel;
}

const wrappedFooter = (model: FooterModel) => {
    return <ContentBlock 
        elements={[new Footer(model)]} 
        height={model.height}
        theme={model.theme}
        classOverride="content-block-footer"/>;
}


const ContentPage: React.FC<ContentPageProps> = (props) => {

    const mobileWidthBreakPoint = 768;
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= mobileWidthBreakPoint);

    React.useEffect(() => {
        window.addEventListener("resize", () => {setIsMobile(window.innerWidth <= mobileWidthBreakPoint)} );
    }, []);

    const footerHeight: number = props.footerModel ? props.footerModel.height : 120;

    let footerBlock = null;
    if (props.footerModel !== undefined) {
        footerBlock = wrappedFooter(props.footerModel);
    }

    let headerBlock = null;
    let mobileContactBlock = null;
    let navigationBlock = null;
    const headerContentBlocks = [];

    if (props.headerModel) {

        // Only show the main contact bar if it's not on mobile.
        const headerContactsToShow: ContactType[] | undefined = isMobile ? [] : props.headerModel.contactTypesToShow;
        const header = new Header({...props.headerModel, contactTypesToShow: headerContactsToShow});
        headerBlock = wrapWithContentBlock(header, props.headerModel.theme);

        // If there is a navigation block.
        if (props.headerModel.navigationModel) {
            const navStyle: object = {paddingTop: "0.8em", paddingBottom: "0.8em"};
            navigationBlock = wrapWithContentBlock(new Navigation(props.headerModel.navigationModel), BlockTheme.INVERTED, "navbar", navStyle);
        }

        // If it's on mobile, we'll use a separate contact block.
        if (isMobile && props.headerModel.contactTypesToShow && props.headerModel.contactModel) {
            const mobileContactBar = new MobileContactBar({
                contactTypesToShow: props.headerModel.contactTypesToShow, 
                contactModel: props.headerModel.contactModel});

            mobileContactBlock = wrapWithContentBlock(mobileContactBar, props.headerModel.theme);
        }

        // If the header has additional content blocks.
        if (props.headerModel.blocks) {
            for (let i: number = 0; i < props.headerModel.blocks.length; i++) {
                const model: ContentBlockModel = props.headerModel.blocks[i];
                const element: JSX.Element = <ContentBlock elements={model.elements} 
                key={i} theme={model.theme} backgroundImagePath={model.imagePath}/>
                headerContentBlocks.push(element);
            }
        }
    }

    const fullyWrappedHeader = <header style={{position: "relative"}}>
            <div className="header-placer"></div> 
            {headerBlock}
            {navigationBlock}
            {mobileContactBlock}
            {headerContentBlocks}
    </header>;

    const wrappedBodyAndHeader = <div style={{minHeight: `calc(100vh - ${footerHeight}px)`}}>
            {fullyWrappedHeader}
            {props.contentBlocks}
        </div>;

    return <>
        
        {wrappedBodyAndHeader}
        {footerBlock}
    </>
}

export default ContentPage;