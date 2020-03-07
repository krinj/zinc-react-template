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
    const title: string = props.title ? props.title : "Opening Hours";

    let publicHolidayElement: JSX.Element | null = null;
    if (props.showPublicHolidayMessage) {
        const publicHolidayMessage: string = "Our hours may be different during public holidays. Please contact us for more details.";
        publicHolidayElement = <div>{publicHolidayMessage}</div>;
    }

    for (let i:number = 0; i < props.slots.length; i++) {
        const slot = renderOpeningHourSlot(props.slots[i], i);
        slots.push(slot);
    }

    return <>
        <h2>{title}</h2>
        {publicHolidayElement}
        {slots}
    </>
}

export default OpeningHours;
