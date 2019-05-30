import React from 'react'; 

import Button from '../../../components/UI/Button/Button';
import mystyle from './ContactData.module.css';

class ContactData extends React.Component { 
    
    state = { 
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        }
    }

    orderHandler =(event) => {
        event.preventDefault();  
        console.log()
    }

    render () {
        return (
            <div className={mystyle.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className={mystyle.Input} type='text' name='name' placeholder='Your Name'></input>
                    <input className={mystyle.Input} type='text' name='email' placeholder='Your Mail'></input>
                    <input className={mystyle.Input} type='text' name='street' placeholder='Street'></input>
                    <input className={mystyle.Input} type='text' name='postalCode' placeholder='Postal Code'></input>
                    <Button btnType='Success' clicked={this.orderHandler} >ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData; 