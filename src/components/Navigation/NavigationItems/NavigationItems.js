import React from 'react'; 

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

//to get the store inf here I willl need to push that information via a parent component that is a class

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Your Burger</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        {!props.isAuth 
            ? <NavigationItem link="/auth">Log In</NavigationItem>  
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
); 

export default navigationItems