import { Dispatcher } from "flux";
import FormStore from "./stores/formstore";
import FormActions from "./actions/formactions";

export default class AppContext {
    constructor() {
        this.formStore = new FormStore;
        this.dispatcher = new Dispatcher;
        this.dispatcher.register(this.formStore.handleActions.bind(this.formStore));
        this.formActions = new FormActions(this.dispatcher);
    }
}