import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import NavigationModel from './NavigationModel';
import NavBarLinear from './NavBarLinear';


class Navigation extends DisplayableElement {

    private model: NavigationModel;

    constructor(model: NavigationModel) {
        super();
        this.model = model;
     }

     protected internalRender() {
        return <NavigationJSX {...this.model}/>;
     }
}

const NavigationJSX: React.FC<NavigationModel> = (props) => {
    return <><NavBarLinear {...props}/></>;
}

export default Navigation