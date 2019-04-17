import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    const { ingredients } = props; 
    
    let transformedIngredients = Object.keys(ingredients)
        .map(igKey => {
            return [...Array(ingredients[igKey])].map((_,i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} /> ;
            })
        })
         .reduce((arr,el) => {
            return arr.concat(el)
        },[]);
    
    console.log(transformedIngredients);
        
        if (transformedIngredients.length < 1) {
            transformedIngredients = <p>Please start to add Ingredients!!!</p>
        }


    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-botton" />
        </div>
    );
}

export default burger; 