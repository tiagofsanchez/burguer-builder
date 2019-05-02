
import React from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Toolbar/Toolbar';

const layout = (props) => (
    <Aux>
        <Toolbar/>
        <main className ={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;