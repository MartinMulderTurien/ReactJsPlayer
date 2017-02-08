export default class VisualizationHandler {
  constructor() {
    this.visualizationrules = [];
    this.fields = {};
    this.components = {};
  }

  syncStore(store) {
    this.fields = store.fields;
    this.components = store.components;
    this.visualizationrules = [];
    this.parseVisualizationRules(store.form);
    this.setOriginalVisualizations(store.form);
    this.propagateReadOnlyValues(store.form, true, null);
    this.setHiddenValue(store.form, true, null);
    
  }

  applyVisualizationRules() {
    for (const ruleP in this.visualizationrules) {
      const rule = this.visualizationrules[ruleP];
      if (rule.visualizationassignment) {
        this.applyVisualizationAssignment(rule);
      }

    }
  }

  parseVisualizationRules(data) {
    if (data.visualizationrules) {
        if (data.visualizationrules.visualizationrule.constructor !== Array) {
          this.visualizationrules.push(data.visualizationrules.visualizationrule);
        } else {
          Array.prototype.push.apply(this.visualizationrules, data.visualizationrules.visualizationrule);
        }
    }
    if (data.children) {
      //for (const child of data.children) {
      for (var i=0; i< data.children.length; i++) {
        var child = data.children[i];
        this.parseVisualizationRules(child);
      }
    }
  }

  propagateReadOnlyValues(data, firstRun = false, parentSetting = null) {
    if (!data) {return}
    if (firstRun) {
      data._isreadonly_orig = data._isreadonly?data._isreadonly:false;
    }

    if (firstRun){
      if (data._isreadonly) {
          if (parentSetting != null) {
            data._isreadonly = parentSetting;
          }
      } else {
        data._isreadonly = parentSetting;
      }
    } else {
        if (!parentSetting) {
          data._isreadonly = data._isreadonly_orig;
        } else {
          data._isreadonly = parentSetting;
        }
    }

    if (data.children) {
      //for (const child of data.children) {
      for (var i=0; i<data.children.length;i++) {
        var child = data.children[i];
        this.propagateReadOnlyValues(child, firstRun, data._isreadonly);
      }
    }
  }

  setOriginalVisualizations(data) {
    if (!data) {return};
    this.setHiddenValue(data, true, null);

    if (data.children) {
      //for (const child of data.children) {
      for (var i=0; i<data.children.length;i++) {
        var child = data.children[i];
        this.setOriginalVisualizations(child);
      }
    }
  }

  setHiddenValue(data, firstRun = false, setting = null) {
    if (firstRun) {
      data._ishidden_orig = data._ishidden?data._ishidden:false;
    } else if (setting) {
      data._ishidden = data._ishidden_orig;
    } else {
      data._ishidden =setting;
    }
  }

  setReadWriteValue(data, firstRun = false, setting = null) {
    if (!firstRun) {
      if (data._isreadonly === true && setting === true) {
        data._isreadonly = false;
      }
    }
  }

  


  applyVisualizationAssignment(rule){
    //first evaluate condition
    const conditionResult = this.evaluateConditions(rule.visualizationconditions);
      var target = this.components[rule.visualizationassignment.left.value];
      if (!target) {
        console.warn("Visualization assignments cannot resolve target: " + rule.visualizationassignment.left.value);
        return;
      }
      if (rule.visualizationassignment.visualizationvaluereadonly === true) {
          this.propagateReadOnlyValues(target,false,conditionResult);
      } 
      
      if (rule.visualizationassignment.visualizationvaluehidden === true) {
        this.setHiddenValue(target, false, conditionResult);
      }

      if (rule.visualizationassignment.visualizationvaluevisible === true) {
        this.setHiddenValue(target,false,!conditionResult);
      }

      if (rule.visualizationassignment.visualizationvaluereadwrite === true) {
        this.setReadWriteValue(target, false, conditionResult);
      }
  }


  evaluateConditions(c) {
    var conditions = [];
    if (c.visualizationcondition.constructor !== Array) {
      conditions.push(c.visualizationcondition);
    } else {
      Array.prototype.push.apply(conditions,c.visualizationcondition);
    }

    var result = true;
    for (var i in conditions) {
      if (this.evaluateCondition(conditions[i]) === false) {
        result = false;
        break;
      }
    }
    return result;
  }

  evaluateCondition(c) {
    var result = false;
    if (c.relationaloperatorequalsto) {
      var result = false;
      const left = this.fields[c.left.value]
      var value = c.literalvalue.value;
      result =  (left && left.input && left.input._value != null && left.input._value === value);
      if (result === null) {result = false};
    }

    return result;
  }
}
