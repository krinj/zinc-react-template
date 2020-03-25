import React from 'react';
import SiteContentInterface from './SiteContentInterface';
import ContentPage from './ContentPage/ContentPage';
import ContentBlock from './ContentBlock/ContentBlock';
import ContentPageModel from './ContentPage/ContentPageModel';
import ContentBlockModel from './ContentBlock/ContentBlockModel';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HeaderModel from '../../components/header/HeaderModel';
import FooterModel from '../../components/footer/FooterModel';

// This class generates the entire site from the content object.

interface SiteGeneratorProps {
    content: SiteContentInterface
}

const createBlocksFromPage = (pageModel: ContentPageModel): JSX.Element[] => {

    const contentBlocks: Array<JSX.Element> = [];
    
    for (let i: number = 0; i < pageModel.blocks.length; i++) {
        const blockModel: ContentBlockModel = pageModel.blocks[i];
        const contentBlock: JSX.Element = <ContentBlock elements={blockModel.elements} 
        key={i} theme={blockModel.theme} backgroundImagePath={blockModel.imagePath}/>
        contentBlocks.push(contentBlock);
    }
    return contentBlocks;
}

const wrapPageContent = (headerModel: HeaderModel, footerModel: FooterModel, pageModel: ContentPageModel)  => {

    const contentBlocks = createBlocksFromPage(pageModel);
    const contentPage = <ContentPage 
        contentBlocks={contentBlocks} 
        headerModel={headerModel}
        footerModel={footerModel}
        />

    return contentPage;
}

const SiteGenerator: React.FC<SiteGeneratorProps> = (props) => {

    const routes: JSX.Element[] = [];

    const pageMap = props.content.getPages();
    const headerModel = props.content.getHeaderModelWithDefaultContact()
    const footerModel = props.content.getFooterModelWithDefaultContact()

    pageMap.forEach((pageModel: ContentPageModel, key: string) => {
        const routeElement = <Route key={key} path={key}>{wrapPageContent(headerModel,footerModel, pageModel)}</Route>;
        routes.push(routeElement);
        console.log(key, pageModel);
    });

    const indexRoute: JSX.Element = <Route exact path="/">{wrapPageContent(headerModel, footerModel, props.content.getIndexPage())}</Route>;
    const noMatchRoute: JSX.Element = <Route path="*">{wrapPageContent(headerModel, footerModel, props.content.getIndexPage())}</Route>;

    return <div>
        <BrowserRouter><Switch>
            {indexRoute}
            {routes}
            {noMatchRoute}
        </Switch></BrowserRouter> 
    </div>
}

export default SiteGenerator;