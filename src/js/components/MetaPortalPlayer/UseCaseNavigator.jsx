import React from "react";
import * as FormActions from "../../actions/formactions";
import ComponentFactory from "./ComponentFactory"

export default class UseCaseNavigator extends React.Component {
    constructor(props) {
        super(props)
    }

    navigate() {
        const fieldDef = this.props.definition;
        this.props.appContext.formActions.navigate(fieldDef._navigationvalue, fieldDef._activationid, fieldDef._skiprequiredvalidation)
    }

    render() {
         const fieldDef = this.props.definition;
         const appContext = this.props.appContext;
         var nav = null;
                if (fieldDef._ishidden) {return null;}
          
         switch(fieldDef._usecasenavigatorhint) {
             case "Button":
             {  
                 nav=(<button type="button" onClick={this.navigate.bind(this)}>{fieldDef._label}</button>);
                 break;
             }
         }
         return nav;
    }
}