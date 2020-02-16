import React, { ReactElement } from 'react';
import IDisplayableElement from '../../../zinc/interface/IDisplayElement';
import "../../../style/style.css"

interface ContentBlockProps {
    elements: IDisplayableElement[],
    height?: number
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

    const blockStyle = {width: "100%", height: "auto"};
    if (props.height !== undefined) {
        blockStyle.height = `${props.height}px`;
    }

    const renderedElements: Array<JSX.Element> = [];
    const elementSize: string = getElementSize(props.elements.length);

    for (let i: number = 0; i < props.elements.length; i++) {
        const key: string = i.toString();
        const renderedElement: JSX.Element = props.elements[i].render(key);
        const renderedContainer: JSX.Element = <div className={elementSize}>{renderedElement}</div>
        renderedElements.push(renderedContainer);
    }

    return <div className="dev" style={blockStyle}>
        <div className="dev container" style={{height: "100%"}}>
            <div className="dev row" style={{height: "100%"}}>{renderedElements}</div>
        </div>
    </div>
}

export default ContentBlock;

// function withContentRow(components: Array<ReactElement>, color: string) {

//   const backgroundStyle = {
//     backgroundColor: color
//   };

//   const sectionComponents = [];
//   const numberOfComponents = components.length;

//   for (let i = 0; i < numberOfComponents; i ++) {
//     const newComponent = React.cloneElement(components[i], {key: i});
//     const wrappedComponent = withSection(newComponent, numberOfComponents);
//     sectionComponents.push(wrappedComponent);
//   }

//   return <div style={backgroundStyle}>
//     <div className="contentItem row">
//       {sectionComponents}
//     </div>
//   </div>;
// };

// function withSection(component: ReactElement, sectionCount = 1) {

//   let columnStyle = "sectionItem col-sm-12";

//   if (sectionCount === 2) {
//     columnStyle += " col-md-6";
//   }

//   if (sectionCount === 3) {
//     columnStyle += " col-md-4";
//   }

//   return <div className={columnStyle}>
//       {component}
//   </div>;
// }

// export default withContentRow;