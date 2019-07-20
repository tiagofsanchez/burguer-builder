import React from 'react';
import { Redirect } from 'react-router-dom';

import mystyle from './Auth.module.css';
import Input from '../../components/UI/Forms/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actionCreators from '../../store/actions/actionCreators';
import { connect } from 'react-redux';



class Auth extends React.Component { 

    state = {
        controls: { 
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true, 
                    isEmail: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true, 
                    minLenght: 6,
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true, 
    }


    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event , controlName) => { 
        
        const { controls } = this.state
        
        const updatedControls = { 
            ...controls, 
            [controlName]: {
                ...controls[controlName],
                value: event.target.value, 
                valid: this.checkValidity(controls[controlName].value , controls[controlName].validation),
                touched: true,
            }
        }
        this.setState({
            controls: updatedControls
        })
    }

    submitHandler = (event) => { 
        
        const { controls , isSignup } = this.state;
        const { onAuth } = this.props;

        event.preventDefault();
        onAuth(controls.email.value , controls.password.value , isSignup );

    }

     switchSingInAuthHandler = () => { 
         this.setState({
             ...this.state,
             isSignup: !this.state.isSignup
         })
     }  
    
    render () { 

        const { controls , isSignup } = this.state;
        const { loading , error , isAuth , building } = this.props;

        

        const formElementsArray = [];
        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
            });
        }

        let form = null;
        if (loading) {
            form = <Spinner />
        } else { 
            form = formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))
        }

        let errorMessage = null; 
        if (error) { 
            errorMessage= <p>error.message</p>
        }

        //Simplest way to redirect  
        let authRedirect = null
        if (isAuth && building) { 
            authRedirect = <Redirect to='/checkout'/>
        } else if (isAuth) {
            authRedirect = <Redirect to='/' /> 
        }

        return (

            <div className={mystyle.Auth}> 
                {authRedirect}
                {error}
                <form onSubmit={this.submitHandler}> 
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>    
                </form>
                <Button
                    btnType='Danger'
                    clicked={this.switchSingInAuthHandler}>
                    SWITCH TO {isSignup ? 'SINGIN' : 'SINGUP'}</Button>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loading: state.auth.loading, 
        error: state.auth.error,
        building: state.burguerBuilder.building,
        isAuth: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => { 
    return { 
        onAuth: ( email, password , isSignup ) => dispatch(actionCreators.auth(email, password, isSignup))
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(Auth); 
