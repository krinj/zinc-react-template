import React from 'react';
import DisplayableElement from '../DisplayableElement';
import LocationModel from './LocationModel';


class Location extends DisplayableElement {

    private model: LocationModel;

    constructor(model: LocationModel) {
        super();
        this.model = model;
    }

    protected internalRender() {
        return <LocationJSX {...this.model}/>;
    }
}

const getMapUrl = (address: string) => {
    const mapApiURL: string = "https://maps.googleapis.com/maps/api/staticmap";
    const apiKey: string = "REDACTED";
    const scale: number = 1;
    const zoom: number = 17;
    const width: number = 460;
    const height: number = 460;
    const mapStyle: string = "style=feature:poi|element:all|visibility:off"
    const marker: string = `markers=size:normal%7Ccolor:red%7C${address}`
    const mapStaticURL: string = `${mapApiURL}?center=${address}&zoom=${zoom}&size=${width}x${height}&scale=${scale}&${marker}&${mapStyle}&key=${apiKey}`
    return mapStaticURL;
}

const createSingleContactElement = (label: string, value?: string): JSX.Element | null => {
    if (value !== undefined) {
        return <p><b>{label}</b>: {value}</p>
    }
    return null;
}

const getContactInformation = (address: string, phoneNumber?: string, email?: string) => {

    let addressElement: JSX.Element | null = createSingleContactElement("Address", address);
    let phoneElement: JSX.Element | null = createSingleContactElement("Phone", phoneNumber);
    let emailElement: JSX.Element | null = createSingleContactElement("Email", email);

    return <div>
        {addressElement}
        {phoneElement}
        {emailElement}
    </div>;
}

const LocationJSX: React.FC<LocationModel> = (props) => {

    const title: string = props.title === undefined ? "Contact Us" : props.title;
    const mapStaticURL: string = getMapUrl(props.mapAddress);
    const mapImage = <img src={mapStaticURL}/>;
    const addressElement: JSX.Element = getContactInformation(props.displayAddress, props.phoneNumber, props.email);

    return <>
        <h2>{title}</h2>
        {mapImage}
        {addressElement}
    </>
}

export default Location;
