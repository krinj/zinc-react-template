import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ContactLibrary from '../common-contact/ContactLibrary';
import ContactType from '../common-contact/ContactType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export enum FieldType {
    Email,
    Name,
    PhoneNumber,
    Text,
    Password
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
        
        case FieldType.Text:
        return {label: "Name", type: "text"};

        case FieldType.Password:
        return {label: "Password", type: "password", placeholder: "Enter Password"};
    }
}

export interface CustomInputFieldModel {
    label: string;
    hook: [string, (x: string) => void];
    fieldType: FieldType;
    showIcon?: boolean;
    showLabel?: boolean;
    disabled?: boolean;
}

class CustomInputField {

    public value: string;
    public label: string;
    public setValue: (x: string) => void;
    public fieldType: FieldType;
    private showIcon: boolean = true;
    private showLabel: boolean = true;
    private disabled: boolean = false;


    constructor (m: CustomInputFieldModel) {

        this.value = m.hook[0];
        this.setValue = m.hook[1];
        this.label = m.label;
        this.fieldType = m.fieldType;
        this.showIcon = m.showIcon != null ? m.showIcon : true;
        this.showLabel = m.showLabel != null ? m.showLabel : true;
        this.disabled = m.disabled != null ? m.disabled : false;

    }

    public render(): JSX.Element {

        const input: InputFieldParameters = getParametersForType(this.fieldType);
        let prependElement: JSX.Element | null = null;
        let labelElement: JSX.Element | null = null;
    
        if (input.icon && this.showIcon) {
            prependElement = <div className="input-group-prepend">
                <span className="input-group-text"><FontAwesomeIcon icon={input.icon}/></span>
            </div>
        }

        if (this.showLabel) {
            labelElement = <span><h6>{input.label}</h6></span>;
        }

        return <div>
                {labelElement}
                <div className="input-group mb-3">
                    {prependElement}
                    <input type={input.type} 
                        className="form-control"
                        id={`CustomInputField${input.type}`} 
                        aria-describedby={input.type} 
                        placeholder={input.placeholder} 
                        autoComplete={input.autoComplete}
                        disabled={this.disabled}
                        onChange={e => this.setValue(e.currentTarget.value)}>
                    </input>
                </div>
            </div>
    }
}


export default CustomInputField;