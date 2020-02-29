import React from 'react';
import OpeningHoursModel, { OpeningHoursSlot } from "./OpeningHoursModel";
import DisplayableElement from '../../utils/structure/DisplayableElement';


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

const renderOpeningHourSlot = (slot: OpeningHoursSlot, i: number) => {

    return <div style={{display: "flex", justifyContent: "space-between"}} key={`slot_${i}`}>
        <div><h5>{slot.day}</h5></div>
        <div>{slot.detail}</div>
    </div>
}

const OpeningHoursJSX: React.FC<OpeningHoursModel> = (props) => {

    const slots = [];

    for (let i:number = 0; i < props.slots.length; i++) {
        const slot = renderOpeningHourSlot(props.slots[i], i);
        slots.push(slot);
    }

    return <>
        <h3>Opening Hours</h3>
        {slots}
    </>
}

export default OpeningHours;
