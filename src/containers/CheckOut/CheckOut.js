import React from 'react'; 

import CheckOutSummary from '../../components/Order/CheckOutSummary/ChecktOutSummary';

class CheckOut extends React.Component { 

    state ={
        ingredients: {
            salad: 1,
            meat: 1, 
            cheese: 1, 
            bacon: 1
        }
    }
    
    render () { 
        
        const { ingredients } = this.state;
        
        return (
            <div>
                <CheckOutSummary ingredients={ingredients}/>
            </div>
        )
    }
}

export default CheckOut;