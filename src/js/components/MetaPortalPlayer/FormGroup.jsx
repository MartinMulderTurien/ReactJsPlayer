import React from "react";
import ComponentFactory from "./ComponentFactory"

export default class FormGroup extends React.Component {

    render() {
        const group = this.props.definition;
        const appContext = this.props.appContext;
        const mappedFields = [];
        var index = 0;

        if (group._ishidden) {
            return null;
        }

        if (group.children) {   
            group.children.forEach(function(c) {
            index++;
            mappedFields.push(ComponentFactory(c, appContext, group._name + index));
                    });
        }

         return (
            <div class="form-group">
              <header>{group.label}</header>
              <section>{mappedFields}</section>
            </div>
        );
    }
}
