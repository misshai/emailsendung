import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import {withRouter} from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({onCancel, formValues, surveyId, submitSurvey, history}) => {
	const reviewFields = _.map(formFields, ({name, label}) => {
		return (<div key={name}>
			<label>{label}</label>
			<div>
				{formValues[name]}
			</div>
		</div>);
	});

	return (<div>
		<h5>Please confirm your entries</h5>
		{reviewFields}
		<button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
			Back
		</button>
		<button style={{
				margin: "0 10px"
			}} onClick={() => submitSurvey(formValues, history, true, surveyId)} className="green btn-flat right white-text">
			Send Survey
			<i className="material-icons right">email</i>
		</button>
		<button onClick={() => submitSurvey(formValues, history, false, surveyId)} className="green btn-flat right white-text">
			Save Survey
			<i className="material-icons right">save</i>
		</button>
	</div>);
};

function mapStateToProps(state) {
	return {formValues: state.form.surveyForm.values, surveyId: state.editForm._id};
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
