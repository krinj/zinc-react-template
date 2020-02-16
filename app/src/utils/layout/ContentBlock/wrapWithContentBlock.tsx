import React from "react";
import ContentBlock from "./ContentBlock";
import IDisplayableElement from "../../../zinc/interface/IDisplayElement";


const wrapWithContentBlock = (element: IDisplayableElement, key?: string) => {
    return <ContentBlock elements={[element]} key={key} />
}

export default wrapWithContentBlock;