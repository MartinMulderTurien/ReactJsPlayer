/*
{
    "type":"textField",
    "visualizationHint":"SingleLine",
    "casing":"None",
    "required":true,
    "name":"IncidentSchadeNummer",
    "isReadOnly":false,
    "value":"1000002",
    "label":"Incidentnummer",
    "maxLength":50,
    "emptyMessage":"Incidentnummer is niet ingevuld.",
    "errorMessage":"Incidentnummer bevat een ongeldige waarde.",
    "maxLengthMessage":"Incidentnummer mag niet groter zijn dan 50."
}
*/

export function validateField(field) {
  if (field.isReadOnly === true) return;

  switch (field.type) {
    case 'textField': {
      validateTextField(field);
      break;
    }
  }
}

function validateTextField(field) {
  validateTextFieldRequired(field);
  if (field.hasError) return;
  validateTextFieldMaxLength(field);
  if (field.hasError) return;
}

function validateTextFieldRequired(field) {
  if (field.required === true && (field.value === undefined || field.value === null || field.value === '')) {
    field.hasError = true;
    field.error = field.emptyMessage;
    return true;
  } else {
    field.hasError = false;
    field.error = "";
    return false;
  }
}

function validateTextFieldMaxLength(field) {
  if (Number.isInteger(field.maxLength) && field.value.length > field.maxLength) {
    field.hasError = true;
    field.error = field.maxLengthMessage;
    return true;
  } else {
      field.hasError = false;
      field.error = "";
      return false;
  }
}
