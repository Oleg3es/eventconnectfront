import React from 'react'
import classes from './Sidebar.module.css'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { API_URL } from '../../../utils/consts'
import { useNavigate } from 'react-router-dom'

const fatchFirstEvent = async () => {
    try {
        const response = await axios.get(`${API_URL}/events/current-all`, {
            headers: {
                'Accept': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            withCredentials: true
        });
        return Array.isArray(response.data) ? response.data[0] : null;
    } catch (error) {
        console.error('Fetch failed:', error);
        throw error;
    }
}

const Sidebar = ({ active, setActive }) => {
    const navigate = useNavigate();

    const rootClasses = [classes.sidebar]
    if (active) {
        rootClasses.push(classes.active)
    }

    const {
        data: firstEvent,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['first-event'],
        queryFn: fatchFirstEvent
    });

    const handleRegister = () => {
        navigate(`/event/${firstEvent.id}`);
    };

    const handleClose = () => {
        setActive(false)
    }

    if (isLoading) return <div>Загрузка даты...</div>;
    if (isError) return <div>Ошибка: {error.message}</div>;
    if (!firstEvent?.current_date) return <div>Дата не доступна</div>;

    const dateObj = new Date(firstEvent.current_date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');

    console.log(firstEvent)

    return (
        <div className={rootClasses.join(' ')} onClick={() => setActive(false)}>
            <div className={classes.sidebarContainer} onClick={(e) => e.stopPropagation()}>
                <div className={classes.sidebarControls}>
                    <p className={classes.sidebarTitle}>Следующая встреча</p>
                    <div className={classes.sidebarCloseButton} onClick={() => setActive(false)}></div>
                </div>
                <div className={classes.sidebarDayNumber}>
                    {`${day}.${month}`}
                </div>
                <div className={classes.sidebarLinkList}>
                    <button
                        className={classes.sidebarButton}
                        onClick={handleRegister}>
                        Зарегистрироваться
                    </button>
                    {/* <Link to="/">
                        Календарь встреч
                    </Link> */}
                    <a
                        onClick={handleClose}
                        href="#meetInfo">
                        Как проходят встречи
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar