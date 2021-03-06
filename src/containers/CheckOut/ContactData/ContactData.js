import React from 'react';


import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import mystyle from './ContactData.module.css';
import axios from '../../../axios-orders'; //this would be to keep the errors, not done though
import Input from '../../../components/UI/Forms/Input/Input'
import * as actionCreators from '../../../store/actions/actionCreators';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';

class ContactData extends React.Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5, 

                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:
                        [{ value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: 'fastest',
                valid:true,
                validation: {} //this object exists for the validation to run properly!
            },
        },
       
        formisValid: false,
    }

    //event object is here not to reload the form as expected.
    orderHandler = (event) => {
        
        const { ings, tPrice , onSaveOrder , token , userId } = this.props;
        const { orderForm } = this.state;

        console.log(tPrice); 
        event.preventDefault();
               
        const formData = {};
        for (let id in orderForm ) { 
            formData[id]= orderForm[id].value
        }
        console.log(formData)

        const order = {
            ingredients: ings,
            price: tPrice,
            orderData: formData,
            userId: userId
        }

        console.log(order)
    
        onSaveOrder(order , token )
    }

   
    checkValidity (value, rules) {
        let isValid = true;
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) { 
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }


    //(1) copia o estado (2) copia o objecto abaixo (3) altera essa copia do objecto e muda o estado da componente
    //All of this to do the change of the state in a immutable way
    inputChangedHandler = (event, elementIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedOrderElements = {
            ...updatedOrderForm[elementIdentifier]
        }
        updatedOrderElements.value = event.target.value;
        updatedOrderElements.valid = this.checkValidity( updatedOrderElements.value , updatedOrderElements.validation);
        updatedOrderElements.touched= true;
        updatedOrderForm[elementIdentifier] = updatedOrderElements;
        
        //takes care of the validity of the form and changes the style of the botton
        let checkIfFormValidy = true; 
        for (let el in updatedOrderForm) {
            checkIfFormValidy = updatedOrderForm[el].valid && checkIfFormValidy

        }

        this.setState({
            orderForm: updatedOrderForm,
            formisValid: checkIfFormValidy
        })
        
        console.log(updatedOrderForm)
        console.log(updatedOrderElements)
        console.log(checkIfFormValidy)
        console.log(this.state.formisValid)

    }

    render() {

        const { orderForm , formisValid } = this.state;
        const { loading } = this.props;

        //Looping through the state to create a dymanic form, that I can create somehting very easily for next projects.
        //this needs to be an array so that we can loop through using .map(); and array of objects
        const formElementsArray = [];
        for (let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            })
        }

        let form = (<form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    shouldValidate={formElement.config.validation}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} 
                    changed={(event) => this.inputChangedHandler(event , formElement.id )}/>
            ))}
            <Button btnType='Success' disabled={!formisValid}>ORDER</Button>
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

const mapStateToProps = state => { 
    return { 
        ings: state.burguerBuilder.ingredients,
        tPrice: state.burguerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = dispatch => {
    return { 
        onSaveOrder: ( orderData , token ) => dispatch (actionCreators.purchaseBurguer(orderData, token ))
    }
}

export default connect(mapStateToProps , mapDispatchToProps )(withErrorHandler(ContactData , axios)); 