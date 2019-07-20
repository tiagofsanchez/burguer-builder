import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

//to get the store inf here I willl need to push that information via a parent component that is a class

const navigationItems = (props) => {

    const { isAuth } = props;

    let navItems = null;
    if (isAuth) {
        navItems = (
            <React.Fragment>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
            </React.Fragment>
        )
    } else {
        navItems = <NavigationItem link="/auth">Login</NavigationItem>
    }

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Your Burger</NavigationItem>
            {navItems}
        </ul>

    )
};

export default navigationItems