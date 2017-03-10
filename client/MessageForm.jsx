import React, {Component} from 'react';

import styles from './MessageForm.scss';

class MessageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
    }

    changeHandler = (e) => {
        this.setState({text: e.target.value});
    }

    submitHandler = (e) => {
        e.preventDefault();
        let message = {
            from: this.props.name,
            text: this.state.text
        }
        this.props.onMessageSubmit(message);
        this.setState({text: ''});
    }

    render() {
        return (
            <form className={styles.MessageForm} onSubmit={e => this.submitHandler(e)}>
                <input
                    className={styles.MessageInput}
                    onChange={e => this.changeHandler(e)}
                    value={this.state.text}
                    placeholder='Message'
                />
            </form>
        )
    }
}

export default MessageForm