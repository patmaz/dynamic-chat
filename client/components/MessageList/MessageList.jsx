import React from 'react';

import styles from './MessageList.scss';

const Message = (props) => (
    <div className={props.myMessage ? styles.MyMessage : styles.Message}>
        <strong>{props.from} :: </strong>
        <span>{props.text}</span>
    </div>
);

const MessageList = (props) => (
    <div className={styles.MessageList}>
    {
        props.messages.map((message, i) =>
          <Message
            key={i}
            from={message.from}
            text={message.text}
            myMessage={props.name === message.from}
          />
        )
    }
  </div>
);

export default MessageList;