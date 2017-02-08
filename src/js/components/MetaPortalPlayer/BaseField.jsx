import React from "react";
import * as FormActions from "../../actions/formactions";

export default class BaseField extends React.Component {
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

    aboutToRender() {
      const fieldDef = this.props.definition;
      if (fieldDef.formChanged === true) {
          this.value = this.props.definition.input._value;
          fieldDef.formChanged = false;;
      }
    }
}
