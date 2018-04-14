import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
	render() {

		// Render nothing if the "show" prop is false
		if (!this.props.show) {
			return null;
		}

		// The modal "window"
		const modalStyle = {
			zIndex: 1003,
			display: 'block',
			opacity: 1,
			top: '50%'

		};

		return (<div id="modal1" className="modal open" style={modalStyle}>
			<div className="modal-content">
				{this.props.children}
			</div>
			<div className="modal-footer">
				<a onClick={() => this.props.onNo()} className="modal-action modal-close waves-effect waves-green btn-flat">No</a>
				<a onClick={() => this.props.onYes()} className="modal-action modal-close waves-effect waves-green btn-flat">Yes</a>
			</div>
		</div>);
	}
}

Modal.propTypes = {
	onNo: PropTypes.func.isRequired,
	onYes: PropTypes.func.isRequired,
	show: PropTypes.bool,
	children: PropTypes.node
};

export default Modal;
