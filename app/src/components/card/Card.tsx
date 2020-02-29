import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import CardModel from './CardModel';


class Card extends DisplayableElement {

    private model: CardModel;

    constructor(model: CardModel) {
        super();
        this.model = model;
    }

    protected internalRender() {
        return <CardJSX {...this.model}/>;
    }
}

const CardJSX: React.FC<CardModel> = (props) => {
    return <div>
        <div className="card">
        <img className="card-img-top" src={props.imagePath} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">{props.body}</p>
            </div>
        </div>
    </div>
}

export default Card;

