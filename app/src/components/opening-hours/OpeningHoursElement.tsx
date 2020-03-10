import React from 'react';
import OpeningHoursModel, { OpeningHoursSlot } from "./OpeningHoursModel";
import DisplayableElement from '../../utils/structure/DisplayableElement';
import "../../style/table.css";
import "../../style/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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

    return <div className="table-cell">
        <div style={{display: "flex", justifyContent: "space-between"}} key={`slot_${i}`}>
            <div><h5 className="no-margin">{slot.day}</h5></div>
            <div>{slot.detail}</div>
        </div>
    </div>
}

const renderPublicHolidayMessage = () => {
    const publicHolidayMessage: string = "Our hours may be different during public holidays. Please contact us for more details.";
    return <div className="alert alert-primary" style={{marginTop: "1em", display: "flex"}} role="alert">
        
        <div style={{fontSize: "1.6em", marginRight: "0.8em", display: "flex"}}>
            <FontAwesomeIcon style={{margin: "auto"}} icon={"info"} />
        </div>
        <div>{publicHolidayMessage}</div>
    </div>
}

const OpeningHoursJSX: React.FC<OpeningHoursModel> = (props) => {

    const slots = [];
    const title: string = props.title ? props.title : "Opening Hours";

    let publicHolidayElement: JSX.Element | null = null;
    if (props.showPublicHolidayMessage) {
        publicHolidayElement = renderPublicHolidayMessage();
    }

    for (let i:number = 0; i < props.slots.length; i++) {
        const slot = renderOpeningHourSlot(props.slots[i], i);
        slots.push(slot);
    }

    return <>
        <div className="card">
            <div className="card-body">
                <h2>{title}</h2>
                <div style={{width: "100%", height: "8px"}}/>
                {slots}
                {publicHolidayElement}

            </div>
        </div>
    </>
}

export default OpeningHours;
