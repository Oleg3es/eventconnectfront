import Container from "./Container";
import EventCard from "./EventCard";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../utils/consts";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

// const fetchEvents = async () => {
//   const response = await axios.get(`${API_URL}/events/all`);
//   return response.data;
// };

const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events/current-all`, {
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
};

const Events = () => {
  const { data: currentEvents, isLoading: isCurrentLoading, error } = useQuery({
    queryKey: ["events", "current"], 
    queryFn: fetchEvents,
  });

  console.log(currentEvents);
  if (isCurrentLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;
  return (
    <Container>
      <h1 className="font-bold text-center lg:text-5xl mb-8 text-4xl mt-6">Следующие встречи</h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {Array.isArray(currentEvents) &&
          currentEvents.map((event) => (
            <SwiperSlide key={event.id}>
              <EventCard event={event} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Container>
  );
};

export default Events;
