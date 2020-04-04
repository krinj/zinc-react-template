import React from 'react';


class CustomInputField {

    public value: string;
    public setValue: (x: string) => void;

    constructor (hook: [string, (x: string) => void]) {
        this.value = hook[0];
        this.setValue = hook[1];
    }

    public render(): JSX.Element {

        return <>
            <span><h6>{this.value}</h6></span>
            <input 
            type="text"
            className="form-control"
            onChange={e => this.setValue(e.currentTarget.value)}>
        </input></>;
    }
}


export default CustomInputField;