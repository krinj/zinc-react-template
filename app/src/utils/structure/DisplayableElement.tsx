import React from 'react';


abstract class DisplayableElement {

    // Internal render function to override.
    protected abstract internalRender(): JSX.Element;

    // General public facing render function.
    public render = (): JSX.Element => {
        return <div className="dev" style={{height: "100%"}}>{this.internalRender()}</div>
    }

}

export default DisplayableElement;