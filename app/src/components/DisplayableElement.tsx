import React from 'react';
import "../style/style.css";


abstract class DisplayableElement {

    // Internal render function to override.
    protected abstract internalRender(key?: string): JSX.Element;

    // General public facing render function.
    public render = (key?: string): JSX.Element => {
        return <div className="dev-green">{this.internalRender(key)}</div>
    }

}

export default DisplayableElement;