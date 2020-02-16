import React from 'react';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';

interface ContentPageProps {
    contentBlocks: Array<React.ReactElement>;
}

const ContentPage: React.FC<ContentPageProps> = (props) => {

    const FOOTER_HEIGHT: number = 120;

    const footer = <Footer height={FOOTER_HEIGHT}/>;
    const header = <Header/>;

    const wrappedBodyAndHeader = <div style={{minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`}}>
        {header}
        {props.contentBlocks}
        </div>;

    return <>
        {wrappedBodyAndHeader}
        {footer}
    </>
}

export default ContentPage;