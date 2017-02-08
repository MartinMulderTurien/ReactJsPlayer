import React from "react";
import * as FormActions from "../../actions/formactions";

export default class BooleanField extends React.Component {
constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        this.props.appContext.formActions.blur(this.props.definition._name, event.target.value);
        this.setState({});
    }


    render() {
        var fieldDef = this.props.definition;

        if (fieldDef._ishidden) { return null;}

        var field = null;

         var mappedOptions = [];
        if (fieldDef.input.allowedvalue.constructor !== Array) {
              //var v = fieldDef.input.allowedvalue;
              //mappedOptions.push(<div><input type="radio" name={fieldDef._name} value={v._internalvalue} onChange={this.handleChange} checked={v._internalvalue === fieldDef.input._value}/><span>{v._externalvalue}</span></div>);
        } else {
             mappedOptions = fieldDef.input.allowedvalue.map(v=> <span key={v._internalvalue}><input type="radio" name={fieldDef._name} value={v._internalvalue}  onChange={this.handleChange} checked={v._internalvalue.toString().toLowerCase() === fieldDef.input._value.toString().toLowerCase()}/>{v._externalvalue}</span>)
        }

        var selectedOption = fieldDef.input.allowedvalue[0];
          for (var i=1;i<fieldDef.input.allowedvalue.length;i++) {
              var v = fieldDef.input.allowedvalue[i];
              var vVal = (v._internalvalue)? v._internalvalue.toString() : "";
              var iVal = (fieldDef.input._value)? fieldDef.input._value.toString() : "";
              if (vVal === iVal) {selectedOption = v;}
          }
          const readOnlyValue = selectedOption?selectedOption._externalvalue : ""

        if (fieldDef._isreadonly) {
            field = (<div class="field">
                        <label>{fieldDef.label}</label>
                        <span>{readOnlyValue}</span>
                    </div>);
        } else if (fieldDef._visualizationhint === "RadioPair") {
            field =  (
                <div class="field">
                    <label>{fieldDef.label}</label>
                    {mappedOptions}
                </div>);
        }



        return field;
    }
}
