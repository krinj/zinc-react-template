import React from 'react';
import DisplayableElement from '../DisplayableElement';
import ContactFormModel from './ContactFormModel';
import ContactFormField, {FieldType} from './ContactFormField';
import ContactFormTextArea from './ContactFormTextArea';

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
    setTimeout((e) => props.setFormState(FormState.SUCCESS), 5000);
}

const createContactFormField = (label: string, type: FieldType, isDisabled: boolean, hook: [string, (x: string) => void]): [string, JSX.Element] => {
    const [value, setValue] = hook;
    const contactFormField = <ContactFormField label={label} type={type} onUpdateValue={setValue} value={value} disabled={isDisabled}/>;
    return [value, contactFormField];
}

const createContactFormTextArea = (label: string, isDisabled: boolean, hook: [string, (x: string) => void]): [string, JSX.Element] => {
    const [value, setValue] = hook;
    const textAreaComponent: JSX.Element =  <ContactFormTextArea title={label} setValue={setValue} value={value} disabled={isDisabled}/>;
    return [value, textAreaComponent];
}

const createInfoBanner = (formState: FormState): JSX.Element => {
    if (formState === FormState.SUCCESS) {
        return <>Form Sent Success</>;
    }

    if (formState === FormState.FAILED) {
        return <>Form Failed</>;
    }

    return <></>;
}

const ContactFormJSX: React.FC<ContactFormModel> = (props) => {

    // Pre-process.
    const notesFieldTitle: string = props.notesText === undefined ? "Notes" : props.notesText
    // React Hooks.
    const [formState, setFormState] = React.useState(FormState.READY);
    const isDisabled: boolean = formState !== FormState.READY;

    const [userName, nameField] = createContactFormField("name", FieldType.Name, isDisabled,  React.useState(""));
    const [userEmail, emailField] = createContactFormField("email", FieldType.Email, isDisabled,  React.useState(""));
    const [userPhone, phoneField] = createContactFormField("phone", FieldType.PhoneNumber, isDisabled,  React.useState(""));
    const [userNotes, notesField] = createContactFormTextArea(notesFieldTitle, isDisabled, React.useState(""));

    const displayTitle: string = props.title;
    const displayButton: string = props.buttonText !== undefined ? props.buttonText : DEFAULT_BUTTON_TEXT;

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

    // Add elements which are required by the model.
    const displayedNameField = props.requireName === true ? nameField : null;
    const displayedEmailField = props.requireEmail === true ? emailField : null;
    const displayedPhoneField = props.requirePhone === true ? phoneField : null;
    const displayedNotesField = props.requireNotes === true ? notesField : null;

    return <form onSubmit={onSubmit}>
        <h2>{displayTitle}</h2>

        {displayedNameField}
        {displayedEmailField}
        {displayedPhoneField}
        {displayedNotesField}
        {infoBanner}

        <button type="submit" disabled={isDisabled}>{displayButton}</button>
    </form>
}

export default ContactForm;
