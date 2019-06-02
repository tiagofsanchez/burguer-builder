import React from 'react';


import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import mystyle from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Forms/Input/Input'

class ContactData extends React.Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:
                        [{ value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: ''
            },
        },
        loading: false,
    }



    //event object is here not to reload the form as expected.
    orderHandler = (event) => {

        const { ingredients, price } = this.props;
        console.log(price);

        event.preventDefault();
        this.setState({ loading: true })

        const order = {
            ingredients: ingredients,
            price: price,
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

        const { loading, orderForm } = this.state;

        const formElementsArray = [];
        for (let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            })
        }

        console.log(formElementsArray);
        let form = (<form>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.id}
                    elementConfig={formElement.config}
                    value={formElement.config.value} />
            ))}
            <Button btnType='Success' clicked={this.orderHandler} >ORDER</Button>
        </form>)
        if (loading) {
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