import React from 'react';


class CustomInputField {

    public value: string;
    public label: string;
    public setValue: (x: string) => void;

    constructor (label: string, hook: [string, (x: string) => void]) {
        this.value = hook[0];
        this.setValue = hook[1];
        this.label = label;
    }

    public render(): JSX.Element {

        return <>
            <input 
                style={{marginBottom: "0.5em"}}
                type="text"
                className="form-control"
                placeholder={this.label}
                onChange={e => this.setValue(e.currentTarget.value)}>
            </input>
        </>;
    }
}


export default CustomInputField;