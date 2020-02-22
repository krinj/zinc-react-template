import React from 'react';

interface ContactFormTextAreaProps {
    title: string;
    value: string;
    setValue(x: string):void;
    disabled: boolean;
}

const ContactFormTextArea: React.FC<ContactFormTextAreaProps> = (props) => {
    return <div>
        {props.title}
        <textarea rows={3} disabled={props.disabled} onChange={(e) => props.setValue(e.currentTarget.value)} />
        </div>
}

export default ContactFormTextArea;