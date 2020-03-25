import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface HeaderContactLinkProps {
    icon: IconProp;
    key: string;
    text?: string;
    link?: string;
}

const HeaderContactLink: React.FC<HeaderContactLinkProps> = (props) => {

    const iconElement: JSX.Element = <FontAwesomeIcon icon={props.icon} />;
    const linkStyle: object =  {width: "100%", textAlign: "left", fontWeight: "bold"};
    const noHoverStyle: object = {pointerEvents: "none"};
    
    return <>
    <div className="btn-group" role="group" aria-label="Basic example" style={{width: "100%"}}>
        <span className="btn btn-outline-header btn-sm" style={noHoverStyle}>{iconElement}</span>
        <a href={props.link} className="btn btn-outline-header btn-sm" style={linkStyle}>
            {props.text}
        </a>
</div></>
}

export default HeaderContactLink;