import React from 'react';

import Order from '../Order/Order';

class Orders extends React.Component { 
    render () { 
        return (
            <div>
                <Order />
                <Order />
            </div>
        )
    }
}

export default Orders; 
