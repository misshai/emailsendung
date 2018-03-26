import React, {Component} from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './Header';
import {fetchUser} from '../actions';

import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const NewSurvey = () => <h2>NewSurvey</h2>;

class App extends Component {

	componentWillMount() {
		this.props.fetchUser();
	}
	render() {
		return (<div className='container'>
			<BrowserRouter>
				<div>
					<Header/>
					<Route exact={true} path='/' component={Landing}/>
					<Route exact={true} path='/surveys' component={Dashboard}/>
					<Route exact={true} path='/surveys/new' component={NewSurvey}/>
				</div>
			</BrowserRouter>
		</div>);
	}
}

export default connect(null, {fetchUser})(App);
