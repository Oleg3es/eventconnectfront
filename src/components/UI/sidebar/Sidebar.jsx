import React from 'react'
import classes from './Sidebar.module.css'
import { Link } from 'react-router-dom'

const Sidebar = ({ active, setActive }) => {
    const rootClasses = [classes.sidebar]
    if (active) {
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setActive(false)}>
            <div className={classes.sidebarContainer} onClick={(e) => e.stopPropagation()}>
                <div className={classes.sidebarControls}>
                    <p className={classes.sidebarTitle}>Следующая встреча</p>
                    <div className={classes.sidebarCloseButton} onClick={() => setActive(false)}></div>
                </div>
                <div className={classes.sidebarDayNumber}>
                    31.03
                </div>
                <div className={classes.sidebarLinkList}>
                    <Link to="/event/:id">
                        Зарегистрироваться
                    </Link>
                    <Link to="/">
                        Календарь встреч
                    </Link>
                    <a href="#">
                        Как проходят встречи
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar