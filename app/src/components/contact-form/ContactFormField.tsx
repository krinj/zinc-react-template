import React from 'react';

export enum FieldType {
    Email,
    Name,
    PhoneNumber
}

interface ContactFormFieldProps {
    type: FieldType;
    label: string;
    disabled: boolean;
    value?: string;
    onUpdateValue(x: string): void;
}

interface InputFieldParameters {
    type: string;
    autoComplete?: string;
    placeholder?: string;
}

const getParametersForType = (fieldType: FieldType): InputFieldParameters => {

    switch (fieldType) {
        case FieldType.Email:
        return {type: "email", autoComplete: "email", placeholder: "Enter Email"};
        
        case FieldType.Name:
        return {type: "text", autoComplete: "name", placeholder: "Enter Name"};

        case FieldType.PhoneNumber:
        return {type: "text", autoComplete: "phone", placeholder: "Enter Phone Number"};

    }
}

const ContactFormField: React.FC<ContactFormFieldProps> = (props) => {

    const inputParameters: InputFieldParameters = getParametersForType(props.type);

    return <div>
        {props.label}
        <input type={inputParameters.type} 
            id={`ContactFormField_${inputParameters.type}`} 
            aria-describedby={inputParameters.type} 
            placeholder={inputParameters.placeholder} 
            autoComplete={inputParameters.autoComplete}
            disabled={props.disabled}
            onChange={(e) => props.onUpdateValue(e.currentTarget.value)}>
        </input>
    </div>
}

export default ContactFormField;