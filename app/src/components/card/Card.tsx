import React from 'react';
import IDisplayableElement from '../../zinc/interface/IDisplayElement';
import CardModel from '../../zinc/interface/card/CardModel';


class Card implements IDisplayableElement {
    private model: CardModel;
    constructor(model: CardModel) {
        this.model = model;
    }

    render(key: string) {
        return <CardJSX key={key} {...this.model}/>;
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

