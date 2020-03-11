import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import LocationModel from './LocationModel';
import ContactDefinition from '../common-contact/ContactDefinition';
import ContactType from '../common-contact/ContactType';
import ContactLibrary from '../common-contact/ContactLibrary';
import ContactEntry from '../common-contact/ContactEntry';
import "../../style/location.css";
import "../../style/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Markdown from 'markdown-to-jsx';


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

const getMapUrl = (address: string, apiKey: string): string => {
    const mapApiURL: string = "https://maps.googleapis.com/maps/api/staticmap";
    const scale: number = 2;
    const zoom: number = 16;
    const width: number = 380;
    const height: number = 280;
    const mapStyle: string = "style=feature:poi|element:all|visibility:simplified"
    const marker: string = `markers=size:normal|color:red|${address}`
    const mapStaticURL: string = `${mapApiURL}?center=${address}&zoom=${zoom}&size=${width}x${height}&scale=${scale}&${marker}&${mapStyle}&key=${apiKey}`
    return mapStaticURL;
}

const getMapClickUrl = (address: string): string => {
    const mapsURL: string = "https://www.google.com/maps/place/"
    const formattedAddress: string = address.replace(" ", "+");
    const clickableURL: string = `${mapsURL}${formattedAddress}`;
    return clickableURL;
}

const createContactElement = (def: ContactDefinition, key: string): JSX.Element => {

    const iconStyle = {marginTop: "auto", marginBottom: "auto", marginRight: "1.4rem", fontSize: "1.2rem"};
    const iconElement: JSX.Element = <FontAwesomeIcon style={iconStyle} icon={def.icon} />;

    return <div className="contact-element" style={{display: "flex"}} key={key}>
        <div style={{display: "flex"}}>{iconElement}</div>
        <div style={{width: "100%"}}>
            <div><h6 className="no-margin text-muted">{def.label}</h6></div>
            <div style={{width: "100%"}}><Markdown>{def.body}</Markdown></div>
        </div>
    </div>
}

const createContactSection = (contactDefs: ContactDefinition[]) => {

    const contactElements: JSX.Element[] = [];
    for (let i = 0; i < contactDefs.length; i++) {
        const contactDef: ContactDefinition = contactDefs[i];
        const e: JSX.Element = createContactElement(contactDef, `contactElement${i}`);
        contactElements.push(e);
    }

    return <div style={{marginTop: "1em"}}>{contactElements}</div>;
}

const LocationJSX: React.FC<LocationModel> = (props) => {

    const title: string = props.title === undefined ? "Contact Us" : props.title;
    const imageStyle = {width: "100%", height: "auto"}

    let mapImage: JSX.Element | null;
    if (props.googleApiKey !== undefined) {
        const mapStaticURL: string = getMapUrl(props.mapAddress, props.googleApiKey);
        const mapClickURL: string = getMapClickUrl(props.mapAddress);
        mapImage = <div style={imageStyle}>
            <a href={mapClickURL} target="_blank"><img src={mapStaticURL} style={imageStyle}/></a>
            </div>;
    } else {
        mapImage = <div><b>Error: No Map API Key</b></div>;
    }

    // Get dense contact definitions.
    const contactLib: ContactLibrary = ContactLibrary.getInstance();
    const contactMap: Map<ContactType, ContactEntry> | undefined = props.contactModel?.contactMap;
    const contactDefs: ContactDefinition[] = contactLib.getFilteredContactItems(props.contactTypesToShow, contactMap);
    const contactSection: JSX.Element = createContactSection(contactDefs);

    return <>
    <div className="card">
            <div className="card-body">
                <h2>{title}</h2>
                <div style={{width: "100%", height: "8px"}}/>
                {mapImage}
                {contactSection}

            </div>
        </div>
    </>
}

export default Location;
