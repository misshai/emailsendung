import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';
import formFields from './formFields';
import {validateEmailsString, validateEmail} from '../../utils/validateEmails';

class SurveyForm extends Component {
	renderFields() {

		return _.map(formFields, ({label, name}) => {
			const fieldValue = (this.props.survey && this.props.survey[name])
				? this.props.survey[name]
				: '';

			return (<Field key={name} defaultValue={fieldValue} component={SurveyField} type="text" label={label} name={name}/>);
		});
	}
	render() {
		return (<div>
			<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
				{this.renderFields()}
				<Link to="/surveys" className="red btn-flat white-text">
					Cancel
				</Link>
				<button type="submit" className="teal btn-flat right white-text">
					Next
					<i className="material-icons right">done</i>
				</button>
			</form>
		</div>)
	}
}
function validate(values) {
	const errors = {};

	errors.recipients = validateEmailsString(values.recipients || '');
	errors.fromField = validateEmail(values.fromField || '');

	_.each(formFields, ({name}) => {
		if (!values[name]) {
			errors[name] = 'You must provide a value';
		}
	});

	return errors;
}

SurveyForm = reduxForm({validate, form: 'surveyForm', destroyOnUnmount: false})(SurveyForm);

SurveyForm = connect(state => ({
	initialValues: state.editForm, // pull initial values from account reducer
}))(SurveyForm);

export default SurveyForm;
