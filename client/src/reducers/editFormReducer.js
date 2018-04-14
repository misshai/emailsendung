import {INITIALIZE_EDIT_FORM, FETCH_USER} from '../actions/types';

export default(state = {}, action) => {
	switch (action.type) {
		case INITIALIZE_EDIT_FORM:
			return action.payload;
		case FETCH_USER:
			return {};
		default:
			return state;
	}
}
