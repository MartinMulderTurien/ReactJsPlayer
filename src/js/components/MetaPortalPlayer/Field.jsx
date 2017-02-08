import React from "react";
import * as FormActions from "../../actions/formactions";
import ComponentFactory from "./ComponentFactory"

export default class Field extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const fieldDef = this.props.definition;
        const appContext = this.props.appContext;
        if (fieldDef._ishidden) {return null;}
        var mappedChildren = [];
        var index = 0;
        
        if (fieldDef.children) {
             mappedChildren = [];
             fieldDef.children.forEach(function (c) {
                 index++;
                 mappedChildren.push(ComponentFactory(c, appContext,index));
             });
        }; ;

        if (mappedChildren.length > 0) {
             return (<div class="field">{mappedChildren}</div>);
        } else {
            return null;
        }
    }
}