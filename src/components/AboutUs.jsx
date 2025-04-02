import Container from "./Container";

const AboutUs = () => {
  return (
    <Container>
      <div className="w-full flex justify-center">
        <div className="flex flex-col gap-4 mt-10 max-w-[1200px] justify-center">
          <span className="text-xl flex flex-col gap-8 lg:text-2xl">
            <span className="text-base lg:text-2xl">
              <span className="font-bold text-xl lg:text-3xl">Event Connect</span> — это
              инициатива создателей для создателей. Мы проводим неформальные
              встречи основателей по вечерам понедельников в разных городах
              мира.
            </span>
            <span className="text-base lg:text-2xl">
              На каждой встрече 3–5 предпринимателей делятся своими историями за
              своими историями за 5 минут — не для продажи или поиска
              инвестиций, а для открытого обмена опытом. Это возможность
              поразмышлять вслух, получить честную обратную связь и вдохновить
              других. Неважно, в какой сфере ваш проект и на какой он стадии —
              главное, чтобы была интересная история и желание ей поделиться.
              После выступлений продолжаем общение в неформальной атмосфере.
              Присоединяйтесь!
            </span>
          </span>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;