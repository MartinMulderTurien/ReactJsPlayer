import React from "react"

import ComponentFactory from "./MetaPortalPlayer/ComponentFactory"

export default class MetaPortalPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.getForm = this.getForm.bind(this);
    this.state = {};
  }

  componentWillMount() {
    this.props.appContext.formStore.on("change",this.getForm);
  }

  componentWillUnmount() {
    this.props.appContext.formStore.removeListener("change", this.getForm);
  }

  startClaimDialog() {
    this.props.appContext.formActions.startDialog("claim");
  }

  startPolisDialog() {
    this.props.appContext.formActions.startDialog("polis");
  }

  getForm() {
    this.setState({
      form: this.props.appContext.formStore.getForm(),
    });

  }

  render() {
    const {form} = this.state;

    if (!form) {
      return (
        <div>
           <button type="button" onClick={this.startClaimDialog.bind(this)}>start claim dialog</button>
          <button type="button" onClick={this.startPolisDialog.bind(this)}>start polis dialog</button>
        </div>)
    }

    const mappedChildren = form.children.map((child,index) => ComponentFactory(child, this.props.appContext, "mpp" + index))
    var tree = null;
    if (form.tree) {
      form.tree.type = "tree";
      tree = (<div class="tree-view-panel">{ComponentFactory(form.tree,this.props.appContext)}</div>)
    }
    

    return (<div>
      <h1>Het formulier</h1>
          <button type="button" onClick={this.startClaimDialog.bind(this)}>start claim dialog</button>
          <button type="button" onClick={this.startPolisDialog.bind(this)}>start polis dialog</button>
        <div class="certigo-app">
          {tree}
          <div class="form-panel">
            {mappedChildren}
          </div>
        </div>
      </div>);
  }
}
