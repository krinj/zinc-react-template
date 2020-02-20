import React from 'react';
import IDisplayableElement from '../IDisplayElement';
import HeaderModel from '../../zinc/interface/header/HeaderModel';


class Header implements IDisplayableElement {

    private model: HeaderModel;
    
    constructor(model: HeaderModel) {
        this.model = model;
    }

    render() {
        return <HeaderJSX {...this.model}/>;
    }
}

const HeaderJSX: React.FC<HeaderModel> = (props) => {

    return <div>
        
        <img src={props.logoImagePath}/>
        <h1>{props.title}</h1>
        <h3>{props.subtitle}</h3>

        <p>Phone: {props.phone} | Email: {props.email}</p>
        

    </div>
}

export default Header;
