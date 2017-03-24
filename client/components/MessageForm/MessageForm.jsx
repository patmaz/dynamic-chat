import React, {Component} from 'react';

import styles from './MessageForm.scss';

class MessageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            txt: ''
        };
    }

    submitHandler = (e) => {
        e.preventDefault();
        const message = {
            from: this.props.name,
            text: this.state.txt
        }
        this.props.onMessageSubmit(message);
        this.setState({txt: ''});
    }

    render() {
        return (
            <form className={styles.MessageForm} onSubmit={e => this.submitHandler(e)}>
                <input
                    className={styles.MessageInput}
                    onChange={e => this.setState({txt: e.target.value})}
                    value={this.state.txt}
                    placeholder='Message'
                />
            </form>
        )
    }
}

export default MessageForm;