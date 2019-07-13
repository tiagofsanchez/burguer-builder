import React from 'react';

import Order from '../Order/Order';
import axios from '../../axios-orders';
import Spinner from '../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';


class Orders extends React.Component {

    componentDidMount() {
        this.props.onInitOrders()
    }

    render() {

        const { loading , orders } = this.props;

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

const mapStateToProps = state => { 
    return { 
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => { 
    return { 
        onInitOrders: () => dispatch (actionCreators.downloadOrders())
    }
}


export default connect(mapStateToProps , mapDispatchToProps )(withErrorHandler (Orders , axios)); 
