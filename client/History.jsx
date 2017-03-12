import React, {Component} from 'react';

import styles from './History.scss';

const History = (props) => (
    <div className={styles.History}>
        <table>
            <tbody>
            {props.history.map((msg) => <tr key={msg.id}>
                                                <td>{msg.username}</td>
                                                <td>{msg.text}</td>
                                                <td>{msg.date}</td>
                                            </tr>)}
            </tbody>
        </table>
    </div>
)

export default History;