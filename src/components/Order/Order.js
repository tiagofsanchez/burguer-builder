import React from 'react';

import mysytle from './Order.module.css';

const order = (props) => {

    const { ingredients, price , keyToPass } = props;
    //will transform the object into an array... there are multiple ways of doing that. 
    //One way is in the Burger component 
    //Another one will be here for us to work with

    const newdIngredients = [];
    for (let ingName in ingredients) {
        newdIngredients.push(
            {
                name: ingName,
                amount: ingredients[ingName],
        })
    }

    const ingredientOutput = newdIngredients.map( ig => {
        return <span 
            key={ig.name}
            style={{
                textAlignLast:'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '8px',
            }}
            > {ig.name}: ({ig.amount}) </span>
    }) 


    return (
            <div className={mysytle.Order}>
                <p> Ingredients: {ingredientOutput} </p>
                <p>Price: <strong>USD {price}</strong></p>
            </div>
        )
};

export default order;