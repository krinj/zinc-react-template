import React from 'react';
import ZincContentInterface from './SiteContentInterface';
import ContentPage from './ContentPage/ContentPage';
import ContentBlock from './ContentBlock/ContentBlock';
import ContentPageModel from './ContentPage/ContentPageModel';
import ContentBlockModel from './ContentBlock/ContentBlockModel';

// This class generates the entire site from the content object.

interface SiteGeneratorProps {
    content: ZincContentInterface
}

const createBlocksFromPage = (pageModel: ContentPageModel): JSX.Element[] => {

    const contentBlocks: Array<JSX.Element> = [];
    
    for (let i: number = 0; i < pageModel.blocks.length; i++) {
        const blockModel: ContentBlockModel = pageModel.blocks[i];
        const contentBlock: JSX.Element = <ContentBlock elements={blockModel.elements} key={i} />
        contentBlocks.push(contentBlock);
    }
    return contentBlocks;
}

const SiteGenerator: React.FC<SiteGeneratorProps> = (props) => {

    const pageModel: ContentPageModel = props.content.getPage();
    const contentBlocks = createBlocksFromPage(pageModel);
    const contentPage = <ContentPage 
        contentBlocks={contentBlocks} 
        headerModel={props.content.headerModel}
        footerModel={props.content.footerModel}
        />
    
    return <div>
        {contentPage}
    </div>
}

export default SiteGenerator;