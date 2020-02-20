import React from 'react';
import OpeningHoursModel from "./OpeningHoursModel";
import DisplayableElement from '../DisplayableElement';


class OpeningHours extends DisplayableElement {

    private model: OpeningHoursModel;

    constructor(model: OpeningHoursModel) {
        super();
        this.model = model;
    }

    protected internalRender(key?: string) {
        return <OpeningHoursJSX key={key} {...this.model}/>;
    }
}

const OpeningHoursJSX: React.FC<OpeningHoursModel> = (props) => {
    return <div>This is a Displayable Element: OpeningHours</div>
}

export default OpeningHours;
