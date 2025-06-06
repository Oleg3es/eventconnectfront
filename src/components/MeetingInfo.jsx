import Container from "./Container";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const MeetingInfo = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#meetInfo') {
      const element = document.getElementById('meetInfo');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }
  }, [hash]); 

  return (
    <Container>
      <div id="meetInfo" className="flex flex-col gap-4 items-center mt-10">
        <h2 className="text-3xl lg:text-5xl font-bold text-center">
          Как проходит встреча?
        </h2>
        <div className="flex flex-col gap-4 max-w-[600px] lg:text-xl text-lg">
          <div className="flex gap-4">
            <span className="font-bold">18:40</span>
            <span>Сбор гостей</span>
          </div>
          <div className="flex gap-4">
            <span className="font-bold">19:00</span>
            <span>
              Выступления фаундеров. Каждый питч длится 5 минут, после — вопросы
              от гостей в формате открытого микрофона
            </span>
          </div>
          <div className="flex gap-4">
            <span className="font-bold">20:00</span>
            <span>Общаемся</span>
          </div>
          <div className="flex gap-4">
            <span className="font-bold">21:00</span>
            <span>Должны расходиться, но ни разу такого не было</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MeetingInfo;
