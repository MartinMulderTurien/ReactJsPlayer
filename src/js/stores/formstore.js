import {EventEmitter} from "events";
import VisualizationHandler from "../common/VisualizationHandler";
import * as Validator from "../common/Validator";
import * as FormParser from "../common/FormParser";

export default class FormStore extends EventEmitter {
  constructor() {
    super();
    this.form = null;
    this.fields = {};
    this.components = {};
    this.visualizationHandler = new VisualizationHandler();
    this.xmlForm = null;
  }

  loadForm(data) {
      this.fields = {};
      this.components = {};
    this.form = FormParser.parseXmlForm(data).form;
    //console.log(JSON.stringify(this.form));
    this.parseFields(this.form);
    this.visualizationHandler.syncStore(this);
    this.visualizationHandler.applyVisualizationRules();
  }

  getForm() {
    return this.form;
  }

  handleActions(action) {
    switch (action.type) {
      case "FETCH_FORM_FULFILLED": {
        this.loadForm(action.payload);
        this.emit("change");
        break;
      }
      case "FORM_VALUE_CHANGED" : {
        this.setValue(action.payload);
        this.emit("change");
        break;
      }
      case "FORM_VALUE_BLURR" : {
        this.setValue(action.payload);
        this.validateField(action.payload);
        this.visualizationHandler.applyVisualizationRules();
        this.emit("change");
        break;
      }
      case "FETCH_FORM_REJECTED" : {
        console.error(action.payload);
        break;
      }
      case "FETCH_XMLFORM_FULFILLED": {
        this.loadXmlForm(action.payload);
        break;
      }
      case "FETCH_XMLFORM_REJECTED" : {
        console.error(action.payload);
        break;
      }
    }
  }

  parseFields(data) {
    this.registerComponent(data);
    if (data.children) {
      //for (const child of data.children) {
        for (var i=0;i<data.children.length;i++) {
          var child = data.children[i];

        if (child.children) {
          this.parseFields(child);
        } else {
          this.registerComponent(child);
          this.registerField(child);
        }
      }
    } else {
      this.registerField(data)
    }
  }

  registerField(leaf) {
    if (leaf.input && leaf._name ) {
      if (leaf.input._value === undefined) {leaf.input._value = null;}
      this.fields[leaf._name] = leaf;

    }
  }

  registerComponent(comp) {
    if (comp._name) {
      this.components[comp._name] = comp;
    }

  }

  setValue(data){
    if (this.fields[data.name]) {
      this.fields[data.name].input._value = data.value;
    }
  }

  validateField(data) {
    if (this.fields[data.name]) {
      Validator.validateField(this.fields[data.name]);
    }
  }

}
