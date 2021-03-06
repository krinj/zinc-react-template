import React from "react";
import ContentBlock from "./ContentBlock";
import DisplayableElement from "../DisplayableElement";
import BlockTheme from "./BlockTheme";


const wrapWithContentBlock = (element: DisplayableElement, theme?: BlockTheme, key?: string, styleOverride?: object) => {
    return <ContentBlock elements={[element]} key={key} theme={theme} styleOverride={styleOverride}/>
}

export default wrapWithContentBlock;