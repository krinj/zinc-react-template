import React from "react";
import ContentBlock from "./ContentBlock";
import DisplayableElement from "../DisplayableElement";


const wrapWithContentBlock = (element: DisplayableElement, key?: string) => {
    return <ContentBlock elements={[element]} key={key} />
}

export default wrapWithContentBlock;