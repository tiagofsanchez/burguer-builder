import React from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponet, axios) => {
    return class extends React.Component {

        state = {
            error: null
        }

        componentWillMount() {
            axios.interceptors.request.use(req => {
                this.setState({error:null}); 
                return req;
            })
            axios.interceptors.response.use(res => res, error => { 
                this.setState({error: error})
                console.log(error);
            })
        }


        clearErrorHandler = () => { 
            this.setState({error:null})
        }

        render() {

            let modal = null;
            if (this.state.error) {
                modal =
                    <Modal disableModel={this.clearErrorHandler}>
                        {this.state.error.message}
                    </Modal>
            }

            return (
                <Aux>
                    <WrappedComponet {...this.props} />
                    {modal}
                </Aux>
            );

        }
    }
}

export default withErrorHandler;