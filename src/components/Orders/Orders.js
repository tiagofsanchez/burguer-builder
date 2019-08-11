import React from 'react';

import Order from '../Order/Order';
import axios from '../../axios-orders';
import Spinner from '../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';


class Orders extends React.Component {

    componentDidMount() {

        const { token , userId } = this.props

        this.props.onInitOrders(token , userId)
        console.log(this.props.orders)
    }

    render() {

        const { loading , orders } = this.props;

        let order =
            <div>
                {orders? orders.map(order => (
                    <Order 
                        ingredients={order.ingredients}
                        price={+order.price}
                        key={order.id} 
                        />
                )) : null }
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
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => { 
    return { 
        onInitOrders: (token, userId) => dispatch (actionCreators.downloadOrders(token, userId))
    }
}


export default connect(mapStateToProps , mapDispatchToProps )(withErrorHandler (Orders , axios)); 
