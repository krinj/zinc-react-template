import React, { ReactElement } from 'react';
import IDisplayableElement from '../../../zinc/interface/IDisplayElement';

interface ContentBlockProps {
    elements: IDisplayableElement[]
}

const ContentBlock: React.FC<ContentBlockProps> = (props) => {

    const renderedElements: Array<JSX.Element> = [];
    for (let i: number = 0; i < props.elements.length; i++) {
        const key: string = i.toString();
        const renderedElement: JSX.Element = props.elements[i].render(key);
        renderedElements.push(renderedElement);
    }

    return <div>This is a content block.{renderedElements}</div>
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