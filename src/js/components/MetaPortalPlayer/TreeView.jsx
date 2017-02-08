import React from "react";
import * as FormActions from "../../actions/formactions";
import ComponentFactory from "./ComponentFactory"

export default class TreeView extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const treeNode = this.props.definition;
        const appContext = this.props.appContext;
        const mappedNodes = [];
        var index = 0;

        if (treeNode.treeNode && treeNode.treenode.constructor === Array) {
            treeNode.children.forEach(function (c) {
                index++;
                c.type="tree";
                mappedNodes.push(ComponentFactory(c, appContext, "treenode" + index));

            });
        } else if (treeNode.treenode) {
            index++;
            treeNode.treenode.type="tree"
            mappedNodes.push(ComponentFactory(treeNode.treenode, appContext, "treenode" + index));
        }

        var children = null;
        if (mappedNodes.length >0) {
            children = (<div class="tree-view_children">{mappedNodes}</div>);
        }

        const arrow = 
            (<div class="tree-view_arrow"/>);
 
        return (
            <div class="tree-view">
                {arrow}
                {this.props.definition._label}
                {children}
            </div>
        );
    }


 }