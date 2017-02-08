import React from "react";
import BaseField from "./BaseField"

export default class TextField extends BaseField {
constructor(props) {
    super(props)
  }

render() {
        this.aboutToRender();

        const fieldDef = this.props.definition;
        var field;

        var errorMessage = null;
        if (fieldDef._ishidden) {return null;}

        if (fieldDef.hasError) {
          errorMessage = (<span>{fieldDef.error}</span>)
        }

        if (!fieldDef._isreadonly === true)
        {
            field = (
                <div className="field">
                    <label>{fieldDef.label}</label>
                    <input type="text" name={fieldDef.name} value={this.value} onChange={this.handleChange} onBlur={this.handleBlur}/>
                    <span>{fieldDef.input._value}</span>
                    {errorMessage}
                </div>
            );
        } else {
            field = (
                <div className="field">
                    <label>{fieldDef.label}</label>
                    <span>{fieldDef.input._value}</span>
                </div>
            );
        }
        return field;
    }
}
