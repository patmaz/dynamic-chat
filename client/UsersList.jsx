import React, {Component} from 'react';

import styles from './UsersList.scss';

const UserList = (props) => (
    <div className={styles.Users}>
        <div className={styles.UsersOnline}>
            {props.users.length} people online
        </div>
        <ul className={styles.UsersList}>
            {
                props.users.map((user) => {
                    return (
                        <li key={user.id} className={styles.UserItem}>
                            {user.name}
                            {props.myId === user.id && <span>[me]</span>}
                        </li>
                    );
                })
            }
        </ul>
    </div>
)

export default UserList;