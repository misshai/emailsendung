import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

class SurveyNew extends Component {
	constructor() {
		super();
		this.state = {
			showReview: false
		};
	}

	renderForm() {
		const survey = this.props.location.state
			? this.props.location.state.survey
			: null;
		return (
			this.state.showReview
			? <SurveyReview onCancel={() => this.setState({showReview: false})}/>
			: <SurveyForm survey={survey} onSurveySubmit={() => this.setState({showReview: true})}/>);
	}

	render() {
		return (<div>{this.renderForm()}
		</div>);
	}

}
export default reduxForm({form: 'surveyForm'})(SurveyNew);
