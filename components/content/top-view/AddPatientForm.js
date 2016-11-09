import React from 'react';

import Formsy from 'formsy-react';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle } from 'formsy-material-ui/lib';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

class AddPatientForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      canSubmit: false,
      isOpen: false
    }
    this.errorMessages = {
      wordsError: "Please only use letters",
      numericError: "Please provide a number",
      urlError: "Please provide a valid URL",
    }

    this.enableButton = this.enableButton.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.notifyFormError = this.notifyFormError.bind(this)
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    })
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    })
  }

  submitForm(data) {
    alert(JSON.stringify(data, null, 4));
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  } 

  render() {
    return (
      <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          onInvalidSubmit={this.notifyFormError}
         >
          <FormsyText
            name="first-name"
            validations="isWords"
            validationError={this.errorMessages.wordsError}
            style={{width: '48%', marginRight: 4, marginTop: 0}}
            errorStyle={{float: "left"}}
            required
            floatingLabelText="First name"
          />
          <FormsyText
            name="last-name"
            validations="isWords"
            validationError={this.errorMessages.wordsError}
            style={{width: '48%', marginRight: 4, marginTop: 0}}
            errorStyle={{float: "left"}}
            required
            floatingLabelText="Last name"
          />
          <FormsyText
            name="bed-number"
            validations="isNumeric"
            validationError={this.errorMessages.numericError}
            style={{width: '100%', marginRight: 4, marginTop: 0, padding: 0}}
            errorStyle={{float: "left"}}
            required
            floatingLabelText="Bed number"
          />          
          <FormsyDate
            name="birthdate"
            maxDate={new Date()}
            formatDate={new Intl.DateTimeFormat('de-GE', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            }).format}
            required            
            style={{display: 'inline-block', width: '100%', margin: 0, padding: 0}}
            textFieldStyle={{width: '100%', padding: 0, margin: 0}}
            floatingLabelText="Birthdate"
            autoOk={true}
          />
          
          <FormsySelect
            name="clinic"
            floatingLabelText="Clinic"
            style={{width: '100%', marginRight: 4, marginTop: 0}}
            required
          >
            <MenuItem value={'endo'} primaryText="Endocrinology" />
            <MenuItem value={'pneu'} primaryText="Pulmonology" />
            <MenuItem value={'all'} primaryText="General pediatry" />
          </FormsySelect>
          <FormsySelect
            name="station"            
            floatingLabelText="Station"
            style={{width: '100%', marginRight: 4, marginTop: 0}}
            required
          >
            <MenuItem value={'28'} primaryText="28" />
            <MenuItem value={'29'} primaryText="29" />
          </FormsySelect>
          <FormsyDate
            name="admission-date"
            required
            floatingLabelText="Admission date"
            formatDate={new Intl.DateTimeFormat('de-GE', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            }).format}
            minDate={new Date()}
            style={{display: 'inline-block', width: '100%', margin: 0, padding: 0}}
            textFieldStyle={{width: '100%', padding: 0, margin: 0}}
            autoOk={true}
          />
          <FormsyDate
            name="discharge-date"
            required
            floatingLabelText="Discharge date"
            minDate={new Date()}
            formatDate={new Intl.DateTimeFormat('de-GE', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            }).format}
            style={{display: 'inline-block', width: '100%', margin: 0, padding: 0}}
            textFieldStyle={{width: '100%', padding: 0, margin: 0}}
            autoOk={true}
          />
          <RaisedButton
              style={{float: 'right', marginTop: 10}}
              type="submit"
              primary={true}
              label="Submit"
              disabled={!this.state.canSubmit}
            />
      </Formsy.Form>
      );
  }
}

export default AddPatientForm;