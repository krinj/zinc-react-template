import React from 'react';
import SiteContentInterface from './SiteContentInterface';
import ContentPage from './ContentPage/ContentPage';
import ContentBlock from './ContentBlock/ContentBlock';
import ContentPageModel from './ContentPage/ContentPageModel';
import ContentBlockModel from './ContentBlock/ContentBlockModel';

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

const SiteGenerator: React.FC<SiteGeneratorProps> = (props) => {

    const pageModel: ContentPageModel = props.content.getIndexPage();
    const contentBlocks = createBlocksFromPage(pageModel);
    const contentPage = <ContentPage 
        contentBlocks={contentBlocks} 
        headerModel={props.content.getHeaderModelWithDefaultContact()}
        footerModel={props.content.getFooterModelWithDefaultContact()}
        />
    
    return <div>
        {contentPage}
    </div>
}

export default SiteGenerator;