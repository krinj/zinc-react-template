import React from 'react';
import DisplayableElement from '../DisplayableElement';
import GalleryModel from './GalleryModel';


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

const GalleryJSX: React.FC<GalleryModel> = (props) => {

    const gallery: JSX.Element[] = [];

    for (let i: number = 0; i < props.images.length; i++) {
        const imagePath: string = props.images[i];
        const imageElement: JSX.Element = <div className="col-4" style={{padding: "8px"}}><img src={imagePath} style={{width: "100%"}}/></div>
        gallery.push(imageElement);
    }

    return <>
        <h2>Gallery</h2>
        <div className="row" style={{marginLeft: "-8px", marginRight: "-8px"}}>{gallery}</div>
    </>
}

export default Gallery;
