import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import {sendStripe} from '../actions';
class Payment extends Component {
	render() {
		return (<StripeCheckout name="Emaily" description="sdfsdf" amount={500} token={(token) => {
				this.props.sendStripe(token)
			}
} stripeKey={process.env.REACT_APP_STRIPE_KEY
}>
			<button className="btn">Add credits</button>
		</StripeCheckout>);
	}
}
export default connect(null, {sendStripe})(Payment);
