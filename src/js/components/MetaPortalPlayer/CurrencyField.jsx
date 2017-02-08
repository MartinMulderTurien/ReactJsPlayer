import React from "react";
import * as FormActions from "../../actions/formactions";

export default class CurrencyField extends React.Component {
constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.value = this.props.definition.input._value;
  }

  handleChange(event){
    this.value = event.target.value;
    this.setState({});
  }

  handleBlur(event){
    this.props.appContext.formActions.blur(this.props.definition._name, this.value);
  }

render() {
        const fieldDef = this.props.definition;
        var field;

        if (fieldDef.formChanged === true) {
            this.value = this.props.definition.input._value;
            fieldDef.formChanged = false;;
        }

        var errorMessage = null;
        if (fieldDef._ishidden) {return null;}

        if (fieldDef.hasError) {
          errorMessage = (<span>{fieldDef.error}</span>)
        }

        if (!fieldDef._isreadonly === true)
        {
            field = (
                <div className="field currency-field">
                    <label>{fieldDef.label}</label>
                    <input type="text" name={fieldDef.name} value={this.value} onChange={this.handleChange} onBlur={this.handleBlur}/>
                    {errorMessage}
                </div>
            );
        } else {
            field = (
                <div className="field currency-field">
                    <label>{fieldDef.label}</label>
                    <span>{fieldDef.input._value}</span>
                </div>
            );
        }
        return field;
    }
}
