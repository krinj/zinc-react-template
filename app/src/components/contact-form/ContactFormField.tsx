import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContactLibrary from '../common-contact/ContactLibrary';
import ContactType from '../common-contact/ContactType';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export enum FieldType {
    Email,
    Name,
    PhoneNumber
}

interface ContactFormFieldProps {
    type: FieldType;
    disabled: boolean;
    value?: string;
    onUpdateValue(x: string): void;
}

interface InputFieldParameters {
    label: string;
    icon?: IconProp;
    type: string;
    autoComplete?: string;
    placeholder?: string;
}

const getParametersForType = (fieldType: FieldType): InputFieldParameters => {

    const lib: ContactLibrary = ContactLibrary.getInstance();

    switch (fieldType) {
        case FieldType.Email:
        return {label: "Email", icon: lib.getIcon(ContactType.EMAIL), type: "email", autoComplete: "email", placeholder: "Enter Email"};
        
        case FieldType.Name:
        return {label: "Name",  icon: lib.getIcon(ContactType.NAME), type: "text", autoComplete: "name", placeholder: "Enter Name"};

        case FieldType.PhoneNumber:
        return {label: "Phone Number", icon: lib.getIcon(ContactType.PHONE), type: "text", autoComplete: "phone", placeholder: "Enter Phone Number"};

    }
}

const ContactFormField: React.FC<ContactFormFieldProps> = (props) => {

    const input: InputFieldParameters = getParametersForType(props.type);
    let prependElement: JSX.Element | null = null;

    if (input.icon) {
        prependElement = <div className="input-group-prepend">
            <span className="input-group-text"><FontAwesomeIcon icon={input.icon}/></span>
        </div>
    }

    return <div>
        <span><h6>{input.label}</h6></span>
        <div className="input-group mb-3">
            {prependElement}

            <input type={input.type} 
                className="form-control"
                id={`ContactFormField_${input.type}`} 
                aria-describedby={input.type} 
                placeholder={input.placeholder} 
                autoComplete={input.autoComplete}
                disabled={props.disabled}
                onChange={(e) => props.onUpdateValue(e.currentTarget.value)}>
            </input>

        </div>
    </div>
}

export default ContactFormField;