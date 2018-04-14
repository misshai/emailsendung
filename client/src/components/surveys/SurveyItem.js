import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import Chart from '../Chart';

class SurveyItem extends Component {

	renderEdit() {
		if (!this.props.survey.sent) {
			return (<div>
				<button onClick={() => this.onEditClick()} className='btn-floating right red btn-small'>
					<i className='material-icons'>edit</i>
				</button>
			</div >);
		}

	}

	onEditClick() {
		this.props.initializeEditForm(this.props.survey);
		this.props.history.push({
			pathname: '/surveys/new',
			state: {
				survey: this.props.survey
			}
		});

	}

	render() {
		const {
			dateSent,
			title,
			body,
			lastResponded,
			yes,
			no,
			sent,
			dateCreated
		} = this.props.survey;

		return (<div>
			<a className='btn-floating right red btn-small' onClick={() => this.props.onRemove()}>
				<i className='material-icons'>remove</i>
			</a>
			{this.renderEdit()}
			<div className='card-content'>
				<span className='card-title'>{title}</span>
				< p >
					{body}
					< /p>
						<div className='right-align'>
							<div>
								Created On: {new Date(dateCreated).toLocaleDateString()}
							</div>
							<div>
								Sent On: {
									dateSent
										? new Date(dateSent).toLocaleDateString()
										: 'not sent yet'
								}
							</div>
							<div>
								{
									lastResponded
										? 'Last responded On ' + new Date(lastResponded).toLocaleDateString()
										: 'No responses yet'
								}</div>

						</div>
					</div>
					<div className='card-action'>
						{
							lastResponded
								? <Chart data={[yes, no]}/>
								: ''
						}
					</div>
				</div>);
}
}

export default connect(null,actions)(withRouter(SurveyItem));