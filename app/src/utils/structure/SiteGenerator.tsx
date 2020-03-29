import React from 'react';
import SiteContentInterface from './SiteContentInterface';
import ContentPage from './ContentPage/ContentPage';
import ContentBlock from './ContentBlock/ContentBlock';
import ContentPageModel from './ContentPage/ContentPageModel';
import ContentBlockModel from './ContentBlock/ContentBlockModel';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HeaderModel from '../../components/header/HeaderModel';
import FooterModel from '../../components/footer/FooterModel';
import HeaderWrapper from '../../components/header/HeaderWrapper';
import Footer from '../../components/footer/Footer';

// This class generates the entire site from the content object.

interface SiteGeneratorProps {
    content: SiteContentInterface
}

const createBlocksFromPage = (pageModel: ContentPageModel): JSX.Element[] => {

    const contentBlocks: Array<JSX.Element> = [];
    const blockCount: number = pageModel.blocks.length;
    for (let i: number = 0; i < blockCount; i++) {
        
        const isLastBlock: boolean = i === blockCount - 1;
        const classOverride = isLastBlock? "flex-grow-one" : undefined; // Last block grows to fill the page.
        const blockModel: ContentBlockModel = pageModel.blocks[i];
        const contentBlock: JSX.Element = <ContentBlock elements={blockModel.elements} 

        key={i} theme={blockModel.theme} backgroundImagePath={blockModel.imagePath} classOverride={classOverride}/>
        contentBlocks.push(contentBlock);
    }
    return contentBlocks;
}

const wrapPageContent = (pageModel: ContentPageModel)  => {
    const contentBlocks = createBlocksFromPage(pageModel);
    const contentPage = <ContentPage contentBlocks={contentBlocks} />
    return contentPage;
}

const wrapFooter = (model: FooterModel) => {
    return <ContentBlock 
        elements={[new Footer(model)]} 
        theme={model.theme}
        classOverride="content-block-footer"/>;
}


const SiteGenerator: React.FC<SiteGeneratorProps> = (props) => {

    const routes: JSX.Element[] = [];

    const pageMap = props.content.getPages();
    const headerModel = props.content.getHeaderModelWithDefaultContact()
    const footerModel = props.content.getFooterModelWithDefaultContact()

    pageMap.forEach((pageModel: ContentPageModel, key: string) => {
        const routeElement = <Route key={key} path={key}>{wrapPageContent(pageModel)}</Route>;
        routes.push(routeElement);
        console.log(key, pageModel);
    });
    
    const indexRoute: JSX.Element = <Route exact path="/">{wrapPageContent(props.content.getIndexPage())}</Route>;
    const noMatchRoute: JSX.Element = <Route path="*">{wrapPageContent(props.content.getIndexPage())}</Route>;
    const wrappedHeader: JSX.Element = <HeaderWrapper {...headerModel} />;
    const wrappedFooter: JSX.Element = wrapFooter(footerModel);

    return <div style={{flexDirection: "column", minHeight: "100vh", display: "flex"}}>
        <BrowserRouter>
            {wrappedHeader}
            <Switch>
                {indexRoute}
                {routes}
                {noMatchRoute}
            </Switch>
            {wrappedFooter}
        </BrowserRouter> 
    </div>
}

export default SiteGenerator;