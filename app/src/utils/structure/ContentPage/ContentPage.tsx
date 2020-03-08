import React from 'react';
import Header from '../../../components/header/Header';
import wrapWithContentBlock from '../ContentBlock/wrapWithContentBlock';
import HeaderModel from '../../../components/header/HeaderModel';
import FooterModel from '../../../components/footer/FooterModel';
import Footer from '../../../components/footer/Footer';
import ContentBlock from '../ContentBlock/ContentBlock';
import MobileContactBar from '../../../components/header/MobileContactBar';


interface ContentPageProps {
    contentBlocks: Array<React.ReactElement>;
    headerModel?: HeaderModel;
    footerModel?: FooterModel;
}

const wrappedFooter = (model: FooterModel) => {
    return <ContentBlock 
        elements={[new Footer(model)]} 
        height={model.height}
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

    if (props.headerModel) {

        // Only show the main contact bar if it's not on mobile.
        const shouldShowHeaderContact: boolean = props.headerModel.showContact ? !isMobile : false;
        const header = new Header({...props.headerModel, showContact: shouldShowHeaderContact});
        headerBlock = wrapWithContentBlock(header);

        // If it's on mobile, we'll use a separate contact block.
        if (isMobile && props.headerModel.showContact && props.headerModel.contactModel) {
            const mobileContactBar = new MobileContactBar({contactModel: props.headerModel.contactModel});
            mobileContactBlock = wrapWithContentBlock(mobileContactBar);
        }
    }

    const wrappedBodyAndHeader = <div style={{minHeight: `calc(100vh - ${footerHeight}px)`}}>
            {headerBlock}
            {mobileContactBlock}
            {props.contentBlocks}
        </div>;

    return <>
        {wrappedBodyAndHeader}
        {footerBlock}
    </>
}

export default ContentPage;