import {combineReducers} from 'redux';
import {reducer as surveyFormReducer} from 'redux-form';
import authReducer from './authReducer';
import surveyReducer from './surveyReducer';
import editForm from './editFormReducer';
import axios from 'axios';
window.axios = axios;

export default combineReducers({auth: authReducer, form: surveyFormReducer, surveys: surveyReducer, editForm: editForm});
