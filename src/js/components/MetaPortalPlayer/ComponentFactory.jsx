import React from "react";
import TextField from "./TextField"
import CodeListField from "./CodeListField"
import FormGroup from "./FormGroup"
import FieldGroup from "./FieldGroup"
import TreeView from "./TreeView"
import IntegerField from "./IntegerField"
import Field from "./Field"
import UseCaseNavigator from "./UseCaseNavigator"
import BooleanField from "./BooleanField"
import CertigoDateField from "./CertigoDateField"
import PostalCodeField from "./PostalCodeField"
import PhoneNumberField from "./PhoneNumberField"
import CurrencyField from "./CurrencyField"
import EmailField from "./EmailField"
import BankAccountField from "./BankAccountField"



export default function ComponentFactory(definition, appContext, key){
    var comp = null;
    definition.formChanged = true;
    switch (definition.type.toLowerCase()) {
        case "textfield":
            comp = (<TextField definition={definition} appContext={appContext} key={key}/>);
            break;
        case "codelistfield":
            comp = (<CodeListField definition={definition} appContext={appContext} key={key}/>);
            break;
        case "integerfield":
            comp = (<IntegerField definition={definition} appContext={appContext} key={key}/>);
            break;
        case "formgroup":
            comp = (<FormGroup definition={definition} appContext={appContext} key={key}/>);
            break;
        case "fieldgroup":
            comp = (<FieldGroup definition={definition} appContext={appContext} key={key}/>);
            break;
        case "systemfield":
            //No rendering!
            break;
        case "field":
            comp=(<Field definition={definition} appContext={appContext} key={key}/>);
            break;
        case "usecasenavigator":
            comp = (<UseCaseNavigator definition={definition} appContext={appContext} key={key}/>);
            break;
        case "tree":
            comp = (<TreeView definition={definition} appContext={appContext} key={key}/>);
            break;
        case "booleanfield":
            if (definition._visualizationhint == "SelectBox") {
                comp= (<CodeListField definition={definition} appContext={appContext} key={key} />);
            } else {
                comp= (<BooleanField definition={definition} appContext={appContext} key={key}/>);
            }
            break;
        case "datefield":
            comp=(<CertigoDateField definition={definition} appContext={appContext} key={key}/> );
            break;
        case "postalcodefield":
            comp=(<PostalCodeField definition={definition} appContext={appContext} key={key}/> );
            break;
        case "phonenumberfield":
            comp=(<PhoneNumberField definition={definition} appContext={appContext} key={key}/> );
            break;
        
        case "currencyfield":
            comp=(<CurrencyField definition={definition} appContext={appContext} key={key}/> );
            break;
            
        case "emailfield":
            comp=(<EmailField definition={definition} appContext={appContext} key={key}/> );
            break;
        case "bankaccountfield":
            comp=(<BankAccountField definition={definition} appContext={appContext} key={key}/> );
            break;
        default:
            comp=(<p key={key}>No factory for {definition.type}</p>)
            break;
    }
    return comp;

}
