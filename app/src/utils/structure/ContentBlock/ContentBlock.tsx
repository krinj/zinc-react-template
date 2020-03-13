import React from 'react';
import "../../../style/style.css"
import DisplayableElement from '../DisplayableElement';

interface ContentBlockProps {
    elements: DisplayableElement[];
    height?: number;
    color?: string;
    classOverride?: string;
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
        minHeight: "auto",
        backgroundColor: props.color
    };
    
    if (props.height !== undefined) {
        blockStyle.minHeight = `${props.height}px`;
    }

    let blockClass: string = "content-block dev";
    if (props.classOverride) {
        blockClass += " " + props.classOverride;
    }

    const renderedElements: Array<JSX.Element> = [];
    const elementSize: string = getElementSize(props.elements.length);

    for (let i: number = 0; i < props.elements.length; i++) {
        const renderedElement: JSX.Element = props.elements[i].render();
        const renderedContainer: JSX.Element = <div className={"display-element " + elementSize} key={`block${i}`}>{renderedElement}</div>
        renderedElements.push(renderedContainer);
    }

    return <div className={blockClass} style={blockStyle}>
        <div className="container dev content-holder">
            <div className="row" style={{height: "100%"}}>{renderedElements}</div>
        </div>
    </div>
}

export default ContentBlock;