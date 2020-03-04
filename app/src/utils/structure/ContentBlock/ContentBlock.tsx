import React from 'react';
import "../../../style/style.css"
import DisplayableElement from '../DisplayableElement';

interface ContentBlockProps {
    elements: DisplayableElement[],
    height?: number,
    color?: string
}

const getElementSize = (numberOfElements: number) => {

    const columnClasses: Array<string> = ["col-sm-12"];

    switch (numberOfElements) {

        case 2:
            columnClasses.push("col-md-6");
            break;

        case 3:
            columnClasses.push("col-md-4");
            break;

        case 4:
            columnClasses.push("col-md-3");
            break;
    }

    return columnClasses.join(" ")

}

const ContentBlock: React.FC<ContentBlockProps> = (props) => {

    const blockStyle = {
        width: "100%", 
        height: "auto",
        backgroundColor: props.color
    };
    
    if (props.height !== undefined) {
        blockStyle.height = `${props.height}px`;
    }

    const renderedElements: Array<JSX.Element> = [];
    const elementSize: string = getElementSize(props.elements.length);

    for (let i: number = 0; i < props.elements.length; i++) {
        const renderedElement: JSX.Element = props.elements[i].render();
        const renderedContainer: JSX.Element = <div className={elementSize} key={`block${i}`}>{renderedElement}</div>
        renderedElements.push(renderedContainer);
    }

    return <div className="dev" style={blockStyle}>
        <div className="dev container" style={{height: "100%"}}>
            <div className="dev row" style={{height: "100%"}}>{renderedElements}</div>
        </div>
    </div>
}

export default ContentBlock;