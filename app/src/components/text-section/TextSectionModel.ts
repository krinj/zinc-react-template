interface TextSectionModel {
    body: string;
    markdownPath?: string;
    centered?: boolean;
    minHeight?: number;

    // Both of these must be present for the call to action to appear.
    callToActionLabel?: string;
    callToActionLink?: string;
}

export default TextSectionModel;