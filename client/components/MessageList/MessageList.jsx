import React, {Component} from 'react';

import styles from './MessageList.scss';

const Message = (props) => (
    <div className={props.myMessage ? styles.MyMessage : styles.Message}>
        <strong>{props.from} :: </strong>
        <span>{props.text}</span>
        <span className={styles.Time}>{props.time}</span>
    </div>
);

const MessageList = (props) => (
    <div id={'messagesList'} className={styles.MessageList}>
    {
        props.messages.slice(0).reverse().map((message, i) => {
            return (
                <Message
                    key={i}
                    from={message.from}
                    text={message.text}
                    time={message.time}
                    myMessage={props.name === message.from}
                />
            );
        })
    }
  </div>
);

export default MessageList;