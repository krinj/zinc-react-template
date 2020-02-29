import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import GalleryModel from './GalleryModel';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


const GALLERY_PADDING: number = 6;


class Gallery extends DisplayableElement {

    private model: GalleryModel;

    constructor(model: GalleryModel) {
        super();
        this.model = model;
    }

    protected internalRender() {
        return <GalleryJSX {...this.model}/>;
    }
}

const createLightBox = (index: number, images: string[], setIndex: (n: number) => any, setLightBoxOpen: (x: boolean) => any): JSX.Element => {

    // Set index.
    const imageLength: number = images.length;
    const prevIndex: number = (index - 1) % imageLength;
    const nextIndex: number = (index + 1) % imageLength;

    // Image sources.
    const currentImage = images[index];
    const prevImage = images[prevIndex];
    const nextImage = images[nextIndex];

    // Create actual light box.
    const lightbox = <Lightbox
        mainSrc={currentImage}
        nextSrc={nextImage}
        prevSrc={prevImage}
        animationDuration={100}
        onCloseRequest={() => setLightBoxOpen(false)}
        onMovePrevRequest={() => setIndex(prevIndex)}
        onMoveNextRequest={() => setIndex(nextIndex)}/>
    
    return lightbox;
}

const createGalleryThumbnail= (
    i: number, 
    imagePath: string, 
    setIsOpen: (x: boolean) => void, 
    setIndex: (x: number) => void,
    mdStyle: string,
    smStyle: string
    ): JSX.Element => {

    const onClick = (_: any) => {
        setIsOpen(true);
        setIndex(i);
    }

    return <div className={`${mdStyle} ${smStyle}`} style={{padding: `${GALLERY_PADDING}px`}} key={`gallery_image_${i}`}>
        <img src={imagePath} style={{width: "100%", cursor: "pointer"}} onClick={onClick}/>
    </div>
}

const GalleryJSX: React.FC<GalleryModel> = (props) => {

    const [index, setIndex] = React.useState(0);
    const [isOpen, setIsOpen] = React.useState(false);

    const imageColMd: number = props.imageColMd !== undefined ? Math.round(12 / props.imageColMd) : 4;
    const imageColMdStyle: string = `col-md-${imageColMd}`;

    const imageColSm: number = props.imageColSm !== undefined ? Math.round(12 / props.imageColSm): 6;
    const imageColSmStyle: string = `col-sm-${imageColSm} col-${imageColSm}`;

    // Gallery Component.
    const gallery: JSX.Element[] = [];
    for (let i: number = 0; i < props.images.length; i++) {
        const imagePath: string = props.images[i];
        const imageElement: JSX.Element = createGalleryThumbnail(i, imagePath, setIsOpen, setIndex, imageColMdStyle, imageColSmStyle);
        gallery.push(imageElement);
    }

    // LightBox Component.
    const lightbox: JSX.Element | null = isOpen ? createLightBox(index, props.images, setIndex, setIsOpen) : null;
    const negativePadding: string = `-${GALLERY_PADDING}px`;

    return <>
        <h2>Gallery</h2>
        <div className="row" style={{marginLeft: negativePadding, marginRight: negativePadding}}>{gallery}</div>
        {lightbox}
    </>
}

export default Gallery;
