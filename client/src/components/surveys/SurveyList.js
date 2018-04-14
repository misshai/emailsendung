import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dropdown from 'react-dropdown';
import _ from 'lodash';
import 'react-dropdown/style.css';
import * as actions from '../../actions';
import Modal from '../Modal';
import SurveyItem from './SurveyItem';
import sortByOptions from './sortByOptions';

class SurveyList extends Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			sortBy: ''
		};
	}

	componentDidMount() {
		this.props.fetchSurveys();
	}

	renderSurveys() {

		return this.sortSurveys().map(survey => {
			return (<div className="card darken-1" key={survey._id}>
				<Modal show={this.state.showModal} onYes={async () => {
						await this.props.deleteSurvey(survey._id);
						this.props.fetchSurveys();
						this.setState({showModal: false});
					}} onNo={() => this.setState({showModal: false})}>Are you sure you want to delete this survey {survey.title}?
				</Modal>
				<SurveyItem survey={survey} onRemove={() => this.setState({showModal: true})}/>
			</div>);
		});
	}
	onSortChange(value) {
		this.setState({sortBy: value});
	}

	sortSurveys() {
		return _.orderBy(this.props.surveys, this.state.sortBy.value, ['asc']);
	}

	renderFilters() {
		return (this.props.surveys.length > 0)
			? <Dropdown styleName='input-field' options={sortByOptions} value={this.state.sortBy} onChange={(value) => this.onSortChange(value)} placeholder="Sort By"/>
			: <h2>No surveys yet
			</h2>;
	}

	render() {

		return (<div>
			{this.renderFilters()}
			{this.renderSurveys()}
		</div>);
	}
}
function mapStateToProps({surveys}) {
	return {surveys};
}

export default connect(mapStateToProps, actions)(SurveyList);
