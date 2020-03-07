import React from 'react';
import Header from '../../../components/header/Header';
import wrapWithContentBlock from '../ContentBlock/wrapWithContentBlock';
import HeaderModel from '../../../components/header/HeaderModel';
import FooterModel from '../../../components/footer/FooterModel';
import Footer from '../../../components/footer/Footer';
import ContentBlock from '../ContentBlock/ContentBlock';


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

    const FOOTER_HEIGHT: number = 120;

    let footerBlock = null;
    if (props.footerModel !== undefined) {
        footerBlock = wrappedFooter(props.footerModel);
    }

    let headerBlock = null;
    if (props.headerModel !== undefined) {
        const header = new Header(props.headerModel);
        headerBlock = wrapWithContentBlock(header);
    }

    const wrappedBodyAndHeader = <div style={{minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`}}>
            {headerBlock}
            {props.contentBlocks}
        </div>;

    return <>
        {wrappedBodyAndHeader}
        {footerBlock}
    </>
}

export default ContentPage;