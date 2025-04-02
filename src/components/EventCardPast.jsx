import React from 'react';

const EventCardPast = ({ event }) => {
    const dateObj = new Date(event.date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("ru-RU", { month: "long" });
    const weekday = dateObj.toLocaleString("ru-RU", { weekday: "long" });
    console.log("event")

    return (
        <div className="flex flex-col gap-4 border-[3px] border-purple-900 p-4 items-center ">
            <span className="text-2xl">{`№${event.id}`}</span>
            <span className="text-3xl">{month}</span>
            <span className="font-bold text-9xl">{day}</span>
            <span className="text-3xl">{weekday}</span>
            <div className="text-center text-xl">{event.location}</div>

            <button disabled
                className="bg-gray-600 text-white px-4 py-2 cursor-pointer"
            >
                Зарегистрироваться
            </button>
        </div>
    )
}

export default EventCardPast