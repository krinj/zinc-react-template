import React from 'react';
import "../../style/style.css";


abstract class DisplayableElement {

    // Internal render function to override.
    protected abstract internalRender(): JSX.Element;

    // General public facing render function.
    public render = (): JSX.Element => {
        return <div className="dev">{this.internalRender()}</div>
    }

}

export default DisplayableElement;