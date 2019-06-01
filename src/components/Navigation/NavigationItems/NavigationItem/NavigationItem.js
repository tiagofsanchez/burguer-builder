import React from 'react';

import classes from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom'; 

const navigationItem = (props) => {
    const { link, children } = props;

    return(
        <li className={classes.NavigationItem}>
            <NavLink to={link} exact activeClassName={classes.active} >
                {children}
            </NavLink>
        </li>
    )
}

export default navigationItem;