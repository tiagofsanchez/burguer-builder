
import React from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


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
        this.setState ({
            showSideDrawer: !this.state.showSideDrawer
        })
    }
    
    render () {
        
        const { children } = this.props;
        const { showSideDrawer } = this.state;
        
        let sideDrawer = null; 
        if (showSideDrawer) {
            sideDrawer = (
            <Aux>
                <SideDrawer  
                    close={this.SideDrawerClosedHandler}
                    open={showSideDrawer}
                    />
            </Aux>
            )
        }

        return (
            <Aux>
                <Toolbar clicked={this.SideDrawerOpenHandler}/>
                {sideDrawer}
                <main className={classes.Content}>
                    {children}
                </main>
            </Aux>
        )

        
    }
}

export default Layout;



/* ###
This was a functional component before we changed to become a class. 
We did that for the component to have state and a method that would change the SideDrawer by the ToolBar button 
###

const layout = (props) => (
    <Aux>
        <Toolbar />
        <SideDrawer />
        <main className ={classes.Content}>
            {props.children}
        </main>
    </Aux>
);
 */