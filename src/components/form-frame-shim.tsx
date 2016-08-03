import * as React from 'react';

export class FormFrameShim extends React.Component<any, any> {
    private _form: HTMLFormElement;
    private fnFormMounted: (form) => void;
    constructor(props) {
        super(props);
        this.state = {
            target: "",
            action: "",
            params: []
        };
        this.fnFormMounted = this.onFormMounted.bind(this);
    }
    private onFormMounted(form) {
        this._form = form;
    }
    submit(url: string, params: string[], target: string): void {
        this.setState({
            action: url, 
            params: params,
            target: target
        }, () => {
            //The form will have the updated content at this point
            this._form.submit();
        })
    }
    render(): JSX.Element {
        const { target, action, params } = this.state;
        return <form style={{ visibility: "hidden", width: 0, height: 0 }} ref={this.fnFormMounted} method="post" id="Frm" target={target} action={action} encType="application/x-www-form-urlencoded">
            {(() => {
                const fields = [];
                for (let i = 0; i < params.length; i+=2) {
                    fields.push(<input id={`f${i}`} key={`f${i}`} type="hidden" name={params[i]} value={params[i+1]} />);
                }
                return fields;
            })()}
        </form>;
    }
}