import React from 'react';


import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import mystyle from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends React.Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    }



    //event object is here not to reload the form as expected.
    orderHandler = (event) => {
        
        const { ingredients , price } = this.props;         
        console.log(price);

        event.preventDefault();
        this.setState({ loading: true })

        const order = {
            ingredients: ingredients,
            price: price,
            customer: {
                name: "Tiago Sanchez",
                address: {
                    street: 'you wish',
                    zipCode: '413151',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }




    render() {

        const { loading } = this.state;

        let form = (<form>
            <input className={mystyle.Input} type='text' name='name' placeholder='Your Name'></input>
            <input className={mystyle.Input} type='text' name='email' placeholder='Your Mail'></input>
            <input className={mystyle.Input} type='text' name='street' placeholder='Street'></input>
            <input className={mystyle.Input} type='text' name='postalCode' placeholder='Postal Code'></input>
            <Button btnType='Success' clicked={this.orderHandler} >ORDER</Button>
        </form>)
        if ( loading ) {
            form = <Spinner /> 
        }
         
        return (
            <div className={mystyle.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}     
            </div>
        )
    }
}

export default ContactData; 