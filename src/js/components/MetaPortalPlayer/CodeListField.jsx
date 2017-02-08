import React from "react";
import * as FormActions from "../../actions/formactions";

export default class CodeListfieldDef extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.props.appContext.formActions.blur(this.props.definition._name, event.target.value);
  }

  render() {
          const fieldDef = this.props.definition;
           if (fieldDef._ishidden) {return null;}
          var mappedOptions = [];
          if (fieldDef.input.allowedvalue.constructor !== Array) {
              var v = fieldDef.input.allowedvalue;
              mappedOptions.push(<option value={v._internalvalue} key={v._internalvalue}>{v._externalvalue}</option>);
          } else {
             mappedOptions = fieldDef.input.allowedvalue.map(v=> <option value={v._internalvalue} key={v._internalvalue}>{v._externalvalue}</option>)
          }
          var selectedOption = fieldDef.input.allowedvalue[0];
          for (var i=1;i<fieldDef.input.allowedvalue.length;i++) {
              var v = fieldDef.input.allowedvalue[i];
              var vVal = (v._internalvalue)? v._internalvalue.toString() : "";
              var iVal = (fieldDef.input._value)? fieldDef.input._value.toString() : "";
              if (vVal === iVal) {selectedOption = v;}
          }
          const readOnlyValue = selectedOption?selectedOption._externalvalue : ""

          var field;
          var value = (selectedOption?selectedOption._internalvalue:null);
          if (!fieldDef._isreadonly===true) {
              field = (
                  <div class="field">
                      <label>{fieldDef.label}</label>
                      <select value={value} onChange={this.handleChange} >
                          {mappedOptions}
                      </select>
                  </div>
              );
          } else {
              field = (
                  <div class="field">
                      <label>{fieldDef.label}</label>
                      <span>{readOnlyValue}</span>
                  </div>
              );

          }

          return field;
      }
}
