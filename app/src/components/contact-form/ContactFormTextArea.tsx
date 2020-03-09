import React from 'react';

interface ContactFormTextAreaProps {
    title: string;
    value: string;
    setValue(x: string):void;
    disabled: boolean;
}

const ContactFormTextArea: React.FC<ContactFormTextAreaProps> = (props) => {
    return <div>
        <h6>{props.title}</h6>
        <div className="input-group">
            <textarea 
                className="form-control"  
                rows={3} 
                disabled={props.disabled} 
                onChange={(e) => props.setValue(e.currentTarget.value)} />
        </div>
    </div>
}

export default ContactFormTextArea;