import React from 'react';


interface CallToActionButtonProps {
    label?: string;
    link?: string;
    extraClass?: string;
}

const CallToActionButton: React.FC<CallToActionButtonProps> = (props) => {

    if (props.link) {

        const label: string = props.label ? props.label : "Click Here";
        const extraClass: string = props.extraClass ? props.extraClass : "";

        return <p><a 
            className={"btn btn-primary " + extraClass}
            href={props.link}>{label}
        </a></p>;

    } else {
        return <></>;
    }
}

export default CallToActionButton;