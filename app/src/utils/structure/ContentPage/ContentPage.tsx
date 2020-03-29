import React from 'react';


interface ContentPageProps {
    contentBlocks: Array<React.ReactElement>;
}


const ContentPage: React.FC<ContentPageProps> = (props) => {
    return <>{props.contentBlocks}</>
}

export default ContentPage;