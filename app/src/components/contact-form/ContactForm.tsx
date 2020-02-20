import React from 'react';
import DisplayableElement from '../DisplayableElement';
import ContactFormModel from './ContactFormModel';
import ContactFormField, {FieldType} from './ContactFormField';

const DEFAULT_BUTTON_TEXT: string = "Send";

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

const onContactFormClick = (email: string) => {
    console.log("Form Clicked: " + email);
}

const ContactFormJSX: React.FC<ContactFormModel> = (props) => {

    const [userEmail, setUserEmail] = React.useState("")
    const [userName, setUserName] = React.useState("");
    const [userNotes, setUserNotes] = React.useState("");

    const displayTitle: string = props.title;
    const displayButton: string = props.buttonText !== undefined ? props.buttonText : DEFAULT_BUTTON_TEXT;

    const nameField = <ContactFormField label="Name" type={FieldType.Name} onUpdateValue={setUserName} value={userName}/>;
    const emailField = <ContactFormField label="Email" type={FieldType.Email} onUpdateValue={setUserEmail} value={userEmail}/>;
    const notesField = <div><textarea rows={3}></textarea></div>;

    const onSubmit = (e: any) => {
        e.preventDefault();
        onContactFormClick(userEmail);
    }

    return <form onSubmit={onSubmit}>
        <h2>{displayTitle}</h2>

        {nameField}
        {emailField}
        {notesField}

        <button type="submit">{displayButton}</button>
    </form>
}

export default ContactForm;
