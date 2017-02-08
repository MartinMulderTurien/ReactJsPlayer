import React from "react";
import ComponentFactory from "./ComponentFactory"

export default class FieldGroup extends React.Component {
render() {
        const group = this.props.definition;
        const appContext = this.props.appContext;
        const mappedFields = [];
        var index = 0;
        var className = "field-group"

        if (group._ishidden) {return null;}

        if (group.children) {
            group.children.forEach(function(c) {
                index++;
                mappedFields.push(ComponentFactory(c, appContext, "fieldgr" + index));
            });
        }

        if (group._columncount){
          className += " col-" + group._columncount;
        }
        return (
            <div className={className}>
                {mappedFields}
            </div>
        );
    }
}
