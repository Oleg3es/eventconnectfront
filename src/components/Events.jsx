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
    const response = await fetch(`${API_URL}/events/all`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Cache-Control': 'no-cache'
      },
      credentials: 'include',
      mode: 'cors'
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    throw new Error(`Network error: ${error.message}`);
  }
};

const Events = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
  console.log(data);
  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;
  return (
    <Container>
      <h1 className="font-bold text-center text-6xl mb-8">Следующие встречи</h1>
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
        {Array.isArray(data) &&
          data.map((event) => (
            <SwiperSlide key={event.id}>
              <EventCard event={event} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Container>
  );
};

export default Events;
