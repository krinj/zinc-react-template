import React from 'react';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
import wrapWithContentBlock from '../ContentBlock/wrapWithContentBlock';
import HeaderModel from '../../../zinc/interface/header/HeaderModel';


interface ContentPageProps {
    contentBlocks: Array<React.ReactElement>;
    headerModel?: HeaderModel;
    footerModel?: HeaderModel;
}

const ContentPage: React.FC<ContentPageProps> = (props) => {

    const FOOTER_HEIGHT: number = 120;

    const footer = <Footer height={FOOTER_HEIGHT}/>;

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
        {footer}
    </>
}

export default ContentPage;