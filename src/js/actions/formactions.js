import axios from "axios";

export default class FormActions {
// Fetches the form from the Dialog Server and dispatches it
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  startDialog(usecase) {
      //axios.get("http:../forms/" + usecase + ".form.json")
      axios.get("http:../forms/" + usecase + ".form.xml")
        .then((response) => {
          var data = response.data;
         this.dispatcher.dispatch({type: "FETCH_FORM_FULFILLED", payload: data})
        })
        .catch((err) => {
          this.dispatcher.dispatch({type: "FETCH_FORM_REJECTED", payload: err})
        })
  }

  setValue(name, value) {
    var data = {name: name, value: value};
    this.dispatcher.dispatch({type: "FORM_VALUE_CHANGED", payload: data});
  }

  blur(name, value) {
    var data = {name: name, value: value};
    this.dispatcher.dispatch({type: "FORM_VALUE_BLURR", payload: data});
  }

  navigate(navigationValue, activationId, skipRequiredValidation){
    var data = {navigationValue: navigationValue, activationId:activationId, skipRequiredValidation:skipRequiredValidation};
    alert("Navigation requested: " + navigationValue);
    this.dispatcher.dispatch({type: "NAVIGATION_REQUESTED", payload: data});
  }

}
