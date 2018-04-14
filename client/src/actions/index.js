import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS, DELETE_SURVEY, INITIALIZE_EDIT_FORM} from './types';

export const deleteSurvey = (surveyId) => async dispatch => {
	await axios.delete('/api/surveys', {
		params: {
			surveyId: surveyId
		}
	});

	dispatch({type: DELETE_SURVEY});

}

export const initializeEditForm = (survey) => {
	return {type: INITIALIZE_EDIT_FORM, payload: survey}
}

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');
	dispatch({type: FETCH_SURVEYS, payload: res.data});
}

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/user');
	dispatch({type: FETCH_USER, payload: res.data});

}

export const sendStripe = (token) => async dispatch => {
	const res = await axios.post('/api/stripe', token);
	dispatch({type: FETCH_USER, payload: res.data});
}

export const submitSurvey = (values, history, sent = true, surveyId) => async dispatch => {
	values.sent = sent;
	values.surveyId = surveyId;
	let res;
	if (surveyId) {
		console.log(surveyId)
		res = await axios.post(`/api/surveys/id/${surveyId}`, values);
	} else {
		res = await axios.post('/api/surveys', values);
	}

	history.push('/surveys');
	dispatch({type: FETCH_USER, payload: res.data});
};
