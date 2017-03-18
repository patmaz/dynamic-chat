import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleCurrentMessageTxt} from './redux/actions.js';


const mapStateToProps = state => ({
    txt: state.mainState.currentMessageText,
});

const mapDispatchToProps = dispatch => ({
    handleCurrentMessageTxt: (txt) => dispatch(handleCurrentMessageTxt(txt)),
});

import styles from './MessageForm.scss';

class MessageForm extends Component {
    constructor(props) {
        super(props);
    }

    submitHandler = (e) => {
        e.preventDefault();
        let message = {
            from: this.props.name,
            text: this.props.txt
        }
        this.props.onMessageSubmit(message);
        this.props.handleCurrentMessageTxt('');
    }

    render() {
        return (
            <form className={styles.MessageForm} onSubmit={e => this.submitHandler(e)}>
                <input
                    className={styles.MessageInput}
                    onChange={e => this.props.handleCurrentMessageTxt(e.target.value)}
                    value={this.props.txt}
                    placeholder='Message'
                />
            </form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);