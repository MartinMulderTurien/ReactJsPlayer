import React from "react";
import * as FormActions from "../../actions/formactions";
import { DateField } from 'react-date-picker'

export default class CertigoDateField extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.definition.input._value != undefined) {
      this.value = this.props.definition.input._value;
    } else {
      this.value = null;
    }
    this.handleBlur = this.handleBlur.bind(this);
    this.handleOnTextChange = this.handleOnTextChange.bind(this);
  }

  handleBlur(event){
    this.props.appContext.formActions.blur(this.props.definition._name, event.target.value);
  }

  handleOnTextChange(value) {
    //this seems to be the handler to use; gives a warning in the console log though
    this.value = value;
    this.setState({});
  }


  render() {
    const fieldDef = this.props.definition;
    if (fieldDef._ishidden) {return null;}

    if (fieldDef.formChanged === true) {
        this.value = this.props.definition.input._value;
        fieldDef.formChanged = false;;
    }

    var field = null;
    var defaultValue = null;
    var forceValidDate = false;

    if (!fieldDef._isreadonly === true) {
      field = (
        <div className = "field datefield">
          <label>{fieldDef.label}</label>
          <DateField
            dateFormat={fieldDef.format.toUpperCase()}
            forceValidDate={false}
            updateOnDateClick={true}
            collapseOnDateClick={true}
            value={this.value}
            onBlur={this.handleBlur}
            onTextChange={this.handleOnTextChange}
          />
        </div>
      );
    }

    return field;
  }
}
