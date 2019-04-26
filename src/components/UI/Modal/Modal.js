import React from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const modal = (props) => {

    const { disableModel } = props;
    return (
        <div>
            <Aux>
                <Backdrop disableModel={disableModel} />
                <div className={classes.Modal}>
                    {props.children}
                </div>
            </Aux>
        </div>

    )
};

export default modal; 