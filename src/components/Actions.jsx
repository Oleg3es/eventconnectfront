import React from 'react'
import Container from './Container'
import { useNavigate } from 'react-router-dom';

const Actions = () => {
    const navigate = useNavigate();

    const handleSendAnApplication = () => {
        navigate('/pitches-requests', { scroll: false }); // Страница откроется сверху
    };

    return (
        <Container>
            <div className='flex items-center flex-col w-full my-20 gap-20'>
                <div className='flex flex-col sm:items-start gap-x-1 sm:gap-x-2 justify-between w-full lg:w-200 sm:flex-row'>
                    <h2 className='text-3xl lg:text-5xl font-bold w-70'>
                        Приходите как гость
                    </h2>
                    <div className='flex flex-col w-110 gap-10'>
                        <p className='gap-4 max-w-[600px] lg:text-xl text-lg'>
                            Познакомьтесь с другими фаундерами, узнайте о новых бизнесах, найдите партнеров и друзей
                        </p>
                        <a href='#'
                            className='bg-purple-900 text-white px-4 py-2 cursor-pointer w-50'>
                            Зарегистрироваться
                        </a>
                    </div>
                </div>
                <div className='flex flex-col items-start lg:items-center gap-x-1 sm:gap-x-2 justify-between w-full lg:w-200 sm:flex-row'>
                    <h2 className='text-3xl lg:text-5xl font-bold w-70'>
                        Расскажите свою историю
                    </h2>
                    <div className='flex flex-col w-110 gap-10'>
                        <p className='gap-4 max-w-[600px] lg:text-xl text-lg'>
                            Сделайте питч о своем бизнесе, поделитесь планами, спросите совета, если нужно.
                        </p>
                        <button
                            onClick={handleSendAnApplication}
                            className='bg-purple-900 text-white px-4 py-2 cursor-pointer w-50'>
                            Отправить заявку
                        </button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Actions