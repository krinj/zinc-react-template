import React from 'react';
import HeaderModel from './HeaderModel';
import DisplayableElement from '../../utils/structure/DisplayableElement';


class Header extends DisplayableElement {

    private model: HeaderModel;
    
    constructor(model: HeaderModel) {
        super();
        this.model = model;
    }

    protected internalRender() {
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
