import React from 'react'; 

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Your Burger</NavigationItem>
        <NavigationItem link="/checkout">Checkout</NavigationItem>
    </ul>
); 

export default navigationItems