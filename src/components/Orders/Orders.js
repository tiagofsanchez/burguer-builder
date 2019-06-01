import React from 'react';

import Order from '../Order/Order';
import axios from '../../axios-orders';
import Spinner from '../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends React.Component {

    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const fetchData = [];
                for (let key in response.data) {
                    fetchData.push({
                        id:key,
                        ...response.data[key],
                         })
                }
                this.setState({ loading: false , orders: fetchData});
                console.log(this.state.orders)
            })
            .catch(err => {
                this.setState({ loading: false });
            })
            
            
    }

    render() {

        const { loading , orders } = this.state;

        let order =
            <div>
                {orders.map(order => (
                    <Order 
                        ingredients={order.ingredients}
                        price={+order.price}
                        key={order.id} 
                        />
                ))}
            </div>
        if (loading) { 
            order = <Spinner />
        }

        return (
            <div>
                {order}
            </div>
        )
    }
}

export default withErrorHandler (Orders , axios); 
