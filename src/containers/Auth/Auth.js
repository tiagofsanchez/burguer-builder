import React from 'react';

import mystyle from './Auth.module.css';

import Input from '../../components/UI/Forms/Input/Input';
import Button from '../../components/UI/Button/Button';


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
        }
    }


    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
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
    
    render () { 

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
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


        return (
            <div className={mystyle.Auth}> 
                <form> 
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>    
                </form>
            </div>
        )
    }
}

export default Auth; 
