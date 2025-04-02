import React from 'react'
import classes from './ButtonBurger.module.css'

const ButtonBurger = ({onClick}) => {
    return (
        <div onClick={onClick} className={classes.buttonBurger}>
            <span />
        </div>
    )
}

export default ButtonBurger