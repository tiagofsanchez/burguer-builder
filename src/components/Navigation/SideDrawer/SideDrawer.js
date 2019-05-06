import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';


const sideDrawer = (props) => {

    const { clicked } = props
    return (
        <Aux>
            <div className={classes.SideDrawer} >
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
            <div className={classes.Backdrop}>
                <Backdrop clicked={clicked} />
            </div>
        </Aux>
    );

};

export default sideDrawer;