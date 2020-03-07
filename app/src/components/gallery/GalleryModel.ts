interface GalleryModel {

    // Optional Text Labels.
    title?: string,
    body?: string,

    images: string[];
    imageColMd?: number;
    imageColSm?: number;

}

export default GalleryModel;