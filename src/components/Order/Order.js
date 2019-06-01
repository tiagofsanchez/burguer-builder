import React from 'react';

import mysytle from './Order.module.css';

const order = ( props ) => (
    <div className={mysytle.Order}>
        <p>Ingridients: Salad (1)</p>
        <p>Price: <strong>USD 5.45</strong></p>
    </div> 
);

export default order;