
import React from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import { connect } from 'react-redux'


class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }

    SideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: !this.state.showSideDrawer
        })
    }

    SideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return ({ showSideDrawer: !prevState.showSideDrawer })
        })
    }

    render() {

        const { children , isAuthenticated } = this.props;
        const { showSideDrawer } = this.state;

        let sideDrawer = null;
        if (showSideDrawer) {
            sideDrawer = (
                <Aux>
                    <SideDrawer
                        close={this.SideDrawerClosedHandler}
                        open={showSideDrawer}
                        isAuth={isAuthenticated}
                    />
                </Aux>
            )
        }

        return (
            <Aux>
                <Toolbar
                    clicked={this.SideDrawerOpenHandler} 
                    isAuth={isAuthenticated}/>
                {sideDrawer}
                <main className={classes.Content}>
                    {children}
                </main>
            </Aux>
        )


    }
}

const mapStateToProsp = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProsp)(Layout);
