import React from 'react';

interface ContentPageProps {
    contentBlocks: Array<React.ReactElement>;
}

const ContentPage: React.FC<ContentPageProps> = (props) => {
    return <div>
        {props.contentBlocks}
    </div>
}

export default ContentPage;