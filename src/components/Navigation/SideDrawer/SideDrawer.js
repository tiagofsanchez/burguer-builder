import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';


const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer , classes.Close]
    if (props.open) {
        attachedClasses = [classes.SideDrawer , classes.Open]
    }


    const { close , isAuth } = props
    return (
        <Aux>
            <div className={attachedClasses.join(' ')} >
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={isAuth}/>
                </nav>
            </div>
            <div className={classes.Backdrop}>
                <Backdrop clicked={close} />
            </div>
        </Aux>
    );

};

export default sideDrawer;