import React from 'react'
import Container from './Container'
import axios from 'axios'
import { API_URL } from '../utils/consts'
import { useQuery } from '@tanstack/react-query'
import EventCardPast from './EventCardPast'

const fatchEventPast = async () => {
    try {
        const response = await axios.get(`${API_URL}/events/past-all`, {
            headers: {
                'Accept': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Fetch failed:', error);
        throw error;
    }
}

const EventsPast = () => {
    const {
        data: pastEvents,
        isLoading: isPastLoading,
        error: pastError
    } = useQuery({
        queryKey: ["events", "past"],
        queryFn: fatchEventPast,
    });
    console.log(pastEvents)

    if (isPastLoading) return <div>Загрузка...</div>;
    if (pastError) return <div>Ошибка: {pastError.message}</div>;
    if (!pastEvents) return <div>Данные не получены</div>;
    if (!Array.isArray(pastEvents)) return <div>Получены данные неверного формата</div>;
    if (pastEvents.length === 0) return <div>Нет прошедших событий</div>;

    return (
        <Container>
            <h1 className="font-bold text-center lg:text-5xl mb-8 text-4xl mt-6">Прошедшие встречи</h1>
            <div className='w-full h-auto grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-5'>
                {Array.isArray(pastEvents) &&
                    pastEvents.map(event => (
                        <EventCardPast
                            key={event.id}
                            event={event}
                        />
                    ))
                }
            </div>
        </Container>
    )
}

export default EventsPast