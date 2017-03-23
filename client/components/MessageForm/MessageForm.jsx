import React, {Component} from 'react';
import styles from './MessageForm.scss';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = '';
    }

    submitHandler = (e) => {
        e.preventDefault();
        const message = {
            from: this.props.name,
            text: this.state
        };

        this.props.onMessageSubmit(message);
        this.setState('');
    };

    render() {
        return (
            <form className={styles.MessageForm} onSubmit={e => this.submitHandler(e)}>
                <input
                    className={styles.MessageInput}
                    onChange={e => this.setState(e.target.value)}
                    value={this.state}
                    placeholder='Message'
                />
            </form>
        )
    }
}

export default MessageForm;