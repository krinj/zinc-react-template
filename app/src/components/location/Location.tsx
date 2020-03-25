import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import LocationModel from './LocationModel';
import ContactDefinition from '../common-contact/ContactDefinition';
import ContactType from '../common-contact/ContactType';
import ContactLibrary from '../common-contact/ContactLibrary';
import ContactEntry from '../common-contact/ContactEntry';
import "../../style/location.scss";
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

const getMapClickUrl = (address: string): string => {
    const mapsURL: string = "https://www.google.com/maps/place/"
    const formattedAddress: string = address.replace(" ", "+");
    const clickableURL: string = `${mapsURL}${formattedAddress}`;
    return clickableURL;
}

const createContactElement = (def: ContactDefinition, key: string): JSX.Element => {

    const iconStyle = {marginTop: "auto", marginBottom: "auto", marginRight: "1rem", fontSize: "1.1rem"};
    const iconElement: JSX.Element = <FontAwesomeIcon style={iconStyle} icon={def.icon} />;

    return <div className="contact-element bottom-border" style={{display: "flex"}} key={key}>
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

    return <div style={{marginTop: "2em"}}>{contactElements}</div>;
}

const LocationJSX: React.FC<LocationModel> = (props) => {

    const title: string = props.title === undefined ? "Contact Us" : props.title;
    const imageStyle = {width: "100%", height: "auto"}

    let mapLinkElement: JSX.Element | null;
    if (props.mapImage !== undefined) {
        const mapClickURL: string = getMapClickUrl(props.mapAddress);
        const mapImage: JSX.Element = <img src={props.mapImage} style={imageStyle} alt="Map location of the business"/>
        mapLinkElement = <div style={imageStyle}>
            <a href={mapClickURL} target="_blank">{mapImage}</a>
            </div>;
    } else {
        mapLinkElement = <div><b>Error: No Map API Key</b></div>;
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
                {mapLinkElement}
                {contactSection}
            </div>
        </div>
    </>
}

export default Location;
