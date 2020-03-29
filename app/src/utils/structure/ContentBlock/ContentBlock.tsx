import React from 'react';
import DisplayableElement from '../DisplayableElement';
import BlockTheme from './BlockTheme';


interface ContentBlockProps {
    elements: DisplayableElement[];
    color?: string;
    classOverride?: string;
    backgroundImagePath?: string;
    theme?: BlockTheme;
    styleOverride?: object;
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

    const theme: string = props.theme ? props.theme : BlockTheme.BASIC;

    const blockStyle = {
        width: "100%", 
        height: "auto",
        minHeight: "auto",
    };

    const themeStyle = {
        backgroundImage: "none",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100%"
    }
    
    if (props.backgroundImagePath) {
        themeStyle.backgroundImage = `url(${props.backgroundImagePath})`;
    }

    let blockClass: string = "content-block dev block-style " + theme;
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
        <div className={theme} style={themeStyle}>
            <div className="container dev content-holder" style={props.styleOverride}>
                <div className="row" style={{height: "100%"}}>{renderedElements}</div>
            </div>
        </div>
    </div>
}

export default ContentBlock;