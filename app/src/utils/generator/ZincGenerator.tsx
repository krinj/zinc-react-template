import React from 'react';
import ZincContentInterface from '../../zinc/ZincContentInterface';
import ContentPage from '../layout/ContentPage/ContentPage';
import ContentBlock from '../layout/ContentBlock/ContentBlock';
import ZincPage from '../../zinc/structure/ZincPage';
import ZincBlock from '../../zinc/structure/ZincBlock';

// This class generates the entire site from the content object.

interface ZincGeneratorProps {
    content: ZincContentInterface
}

const createBlocksFromPage = (pageModel: ZincPage): JSX.Element[] => {

    const contentBlocks: Array<JSX.Element> = [];
    
    for (let i: number = 0; i < pageModel.blocks.length; i++) {
        const blockModel: ZincBlock = pageModel.blocks[i];
        const contentBlock: JSX.Element = <ContentBlock elements={blockModel.elements} key={i} />
        contentBlocks.push(contentBlock);
    }
    return contentBlocks;
}

const ZincGenerator: React.FC<ZincGeneratorProps> = (props) => {

    const pageModel: ZincPage = props.content.getPage();
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

export default ZincGenerator;