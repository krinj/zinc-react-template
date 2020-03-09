import React from 'react';
import DisplayableElement from '../../utils/structure/DisplayableElement';
import ContactFormModel from './ContactFormModel';
import ContactFormField, {FieldType} from './ContactFormField';
import ContactFormTextArea from './ContactFormTextArea';
import { invokePostApi } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const DEFAULT_BUTTON_TEXT: string = "Submit";

export enum FormState {
    READY,
    PENDING,
    SUCCESS,
    FAILED
}

class ContactForm extends DisplayableElement {

    private model: ContactFormModel;

    constructor(model: ContactFormModel) {
        super();
        this.model = model;
    }

    protected internalRender() {
        return <ContactFormJSX {...this.model}/>;
    }
}

interface ContactFormClickProps {
    name?: string;
    email?: string;
    phoneNumber?: string;
    notes?: string;
    setFormState(x: FormState): void;
}

const onContactFormClick = (props: ContactFormClickProps) => {
    console.log(props);
    props.setFormState(FormState.PENDING);
    const payload = {
        name: props.name,
        email: props.email,
        phone: props.phoneNumber,
        notes: props.notes
    };
    invokePostApi("https://api.zinccli.com/contact", payload, x => onContactFormResponse(x, props), x => onContactFormError(x, props))
}

const onContactFormResponse = (response: any, props: ContactFormClickProps) => {
    console.log(response);
    if (response.statusCode && response.statusCode === "200") {
        props.setFormState(FormState.SUCCESS);
    } else {
        props.setFormState(FormState.FAILED);
    }
}

const onContactFormError = (response: object, props: ContactFormClickProps) => {
    console.log(response);
    props.setFormState(FormState.FAILED);
}

const createContactFormField = (type: FieldType, isDisabled: boolean, hook: [string, (x: string) => void]): [string, JSX.Element] => {
    const [value, setValue] = hook;
    const contactFormField = <ContactFormField type={type} onUpdateValue={setValue} value={value} disabled={isDisabled}/>;
    return [value, contactFormField];
}

const createContactFormTextArea = (label: string, isDisabled: boolean, hook: [string, (x: string) => void]): [string, JSX.Element] => {
    const [value, setValue] = hook;
    const textAreaComponent: JSX.Element =  <ContactFormTextArea title={label} setValue={setValue} value={value} disabled={isDisabled}/>;
    return [value, textAreaComponent];
}

const createInfoBanner = (formState: FormState): JSX.Element => {

    if (formState === FormState.SUCCESS) {
        const message: string = "Success!";
        return <span className="text-success"><FontAwesomeIcon icon={"check"} style={{marginRight: "0.6em"}}/>{message}</span>;
    }

    if (formState === FormState.FAILED) {
        const message: string = "Error Occured";
        return <span className="text-danger"><FontAwesomeIcon icon={"times"} style={{marginRight: "0.6em"}}/>{message}</span>;
    }

    if (formState === FormState.PENDING) {
        const message: string = "Loading";
        return <div className="text-muted">
            <div className="spinner-border spinner-border-sm" role="status"  style={{marginRight: "0.6em"}}>
                <span className="sr-only" />
            </div>
            {message}
        </div>;
    }

    return <></>;
}

const ContactFormJSX: React.FC<ContactFormModel> = (props) => {

    // Pre-process.
    const notesFieldTitle: string = props.notesText === undefined ? "Notes" : props.notesText
    const displayButton: string = props.buttonText !== undefined ? props.buttonText : DEFAULT_BUTTON_TEXT;

    // React Hooks.
    const [formState, setFormState] = React.useState(FormState.SUCCESS);
    const isDisabled: boolean = formState !== FormState.READY;

    // Fields
    const [userName, nameField] = createContactFormField(FieldType.Name, isDisabled,  React.useState(""));
    const [userEmail, emailField] = createContactFormField(FieldType.Email, isDisabled,  React.useState(""));
    const [userPhone, phoneField] = createContactFormField(FieldType.PhoneNumber, isDisabled,  React.useState(""));
    const [userNotes, notesField] = createContactFormTextArea(notesFieldTitle, isDisabled, React.useState(""));

    const formProps: ContactFormClickProps = {
        name: userName,
        email: userEmail,
        phoneNumber: userPhone,
        notes: userNotes,
        setFormState: setFormState
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        onContactFormClick(formProps);
    }

    let infoBanner: JSX.Element = createInfoBanner(formState);
    const titleElement: JSX.Element | null = props.title ? <h2 className="card-header">{props.title}</h2> : null;
    const subtitleElement: JSX.Element | null = props.subtitle ? <h5 className="card-title">{props.subtitle}</h5> : null;
    const bodyElement: JSX.Element | null = props.body ? <p className="card-text">{props.body}</p> : null;

    // Add elements which are required by the model.
    const displayedNameField = props.requireName === true ? nameField : null;
    const displayedEmailField = props.requireEmail === true ? emailField : null;
    const displayedPhoneField = props.requirePhone === true ? phoneField : null;
    const displayedNotesField = props.requireNotes === true ? notesField : null;

    return <form onSubmit={onSubmit}>

        <div className="card">
            {titleElement}
            <div className="card-body">

                {subtitleElement}
                {bodyElement}
                {displayedNameField}
                {displayedEmailField}
                {displayedPhoneField}
                {displayedNotesField}
                
                <div style={{marginTop: "1rem", display: "flex", justifyContent: "space-between"}}>
                    <div style={{marginTop: "auto", marginBottom: "auto"}}>{infoBanner}</div>
                    <button style={{minWidth: "120px"}} className="btn btn-primary" type="submit" disabled={isDisabled}>{displayButton}</button>
                </div>

            </div>
        </div>
    </form>
}

export default ContactForm;
