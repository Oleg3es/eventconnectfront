import React, { useState, useRef, useId } from 'react'
import Container from '../components/Container'
import { useMutation } from '@tanstack/react-query'
import { API_URL } from '../utils/consts'
import SelectStage from '../components/UI/select/SelectStage'
import stage from '../data/stages.json'
import ButtonDelete from '../components/UI/button/ButtonDelete'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EventSpeaker = () => {

  const navigate = useNavigate()
  const idFile = useId()
  const inputRef = useRef()

  const [formData, setFormData] = useState({
    name: '',
    second_name: '',
    email: '',
    phone: '',
    url_social_media: '',
    agree_terms: false,
    city: '',
    name_startup: '',
    url_site: '',
    stage: '',
    description_startup: '',
    business: '',
    presentation: null
  })
  console.log(formData.stage)

  const registerMutation = useMutation({
    mutationFn: (formDataToSend) => {
      return axios.post(`${API_URL}/pitches-requests`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
        },
        withCredentials: true,
      })
    },
    onSuccess: () => {
      toast.success("Заявка успешно отправлена!")
      setTimeout(() => {
        navigate("/")
      }, 1000)
    },
    onError: (error) => {
      if (error.response?.status === 422) {
        const errorDetails = error.response.data?.detail || []
        const errorMessages = errorDetails.map((err) => {
          return err.msg || JSON.stringify(err)
        }).join("\n")
        toast.error(`Ошибка валидации:\n${errorMessages}`)
      } else {
        toast.error(error.response?.data?.message || "Ошибка при отправке заявки")
      }
    }
  })

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  const handleSelect = (selectedValue) => {
    const selectedStage = stage.find(item => item.id === Number(selectedValue))?.stage || '';

    setFormData(prev => ({
      ...prev,
      stage: selectedStage
    }))
  }

  const handleChangeFile = (e) => {
    const newFile = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      presentation: newFile
    }))
    inputRef.current.value = ''
  }

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      presentation: null
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.second_name ||
      !formData.email ||
      !formData.phone ||
      !formData.url_social_media ||
      !formData.agree_terms ||
      !formData.city ||
      !formData.name_startup ||
      !formData.url_site ||
      !formData.stage ||
      !formData.description_startup ||
      !formData.business ||
      !formData.presentation
    ) {
      toast.error("Пожалуйста, заполните все обязательные поля")
      return
    }

    if (formData.presentation.size > 10 * 1024 * 1024) {
      toast.error('Файл слишком большой (макс. 10MB)')
      return
    }

    const formDataToSend = new FormData()
    Object.keys(formData).forEach(key => {
      if (key === 'presentation') {
        formDataToSend.append(key, formData[key])
      } else {
        formDataToSend.append(key, formData[key])
      }
    })

    registerMutation.mutate(formDataToSend)
  }

  return (
    <Container>
      <div className='mt-40'>
        <h1 className="text-4xl lg:text-6xl text-center font-bold">Заявка на питч</h1>
        <p className="text-3xl mt-10 md:w-2/3 mx-auto">Заполните и отправьте форму. Мы свяжемся с вами и предложим даты, когда вы сможете сделать питч вашего проекта.</p>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 mt-10 md:w-1/2 mx-auto mb-10">

          <div className='w-full'>
            <label htmlFor="city">В каком городе и в какой день вы бы хотели выступить?</label>
            <input
              id="city"
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="p-2 border-2 border-black w-full"
            />
          </div>

          <div className='w-full'>
            <label htmlFor="name_startup">Название стартапа</label>
            <input
              id="name_startup"
              type="text"
              name="name_startup"
              required
              value={formData.name_startup}
              onChange={handleChange}
              className="p-2 border-2 border-black w-full"
            />
          </div>

          <div className='w-full'>
            <label htmlFor="url_site">Ссылка на сайт (если есть)</label>
            <input
              id="url_site"
              type="text"
              name="url_site"
              required
              value={formData.url_site}
              onChange={handleChange}
              className="p-2 border-2 border-black w-full"
            />
          </div>

          <div className='w-full'>
            <label htmlFor="">Стадия стартапа</label>
            <SelectStage
              option={stage.map(option => ({
                name: option.stage,
                id: option.id
              }))}
              required
              defaultValue={'Выберете...'}
              onChange={handleSelect}
              value={stage.find(item => item.stage === formData.stage)?.id || ''} />
          </div>

          <div className='w-full flex flex-col'>
            <label htmlFor="description_startup">Описание стартапа (до 300 знаков)</label>
            <textarea
              id="description_startup"
              type="text"
              name="description_startup"
              required
              value={formData.description_startup}
              onChange={handleChange}
              className="p-2 border-2 border-black overflow-hidden resize-none h-54">
            </textarea>
          </div>

          <div className='w-full flex flex-col'>
            <label htmlFor="business">Бизнес-модель (до 500 знаков)</label>
            <textarea
              id="business"
              type="text"
              name="business"
              required
              value={formData.business}
              onChange={handleChange}
              className="p-2 border-2 border-black overflow-hidden resize-none h-74">
            </textarea>
          </div>

          <div className='w-full flex flex-col relative'>
            <label htmlFor={idFile} className="mb-2">Презентация (до 100мб)</label>
            <div className="relative">
              <input
                id={idFile}
                type="file"
                ref={inputRef}
                onChange={handleChangeFile}
                className='hidden' // Скрываем стандартный input
              />
              <div
                onClick={handleButtonClick} // Обработчик клика для кастомной кнопки
                className="bg-[#5465ff] text-white px-4 py-2 inline-block cursor-pointer"
              >
                {"Загрузить файл"}
              </div>
            </div>
          </div>

          <div>
            {formData.presentation && (
              <div>
                {formData.presentation.name}
                <br />
                <ButtonDelete onRemove={removeFile} />
              </div>
            )}
          </div>
          <h2 className='text-4xl text-center font-bold'>Контактные данные</h2>

          <div className='w-full'>
            <label htmlFor="name">Имя</label>
            <input
              id="name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="p-2 border-2 border-black w-full"
            />
          </div>

          <div className='w-full'>
            <label htmlFor="second_name">Фамилия</label>
            <input
              id="second_name"
              type="text"
              name="second_name"
              required
              value={formData.second_name}
              onChange={handleChange}
              className="p-2 border-2 border-black w-full"
            />
          </div>

          <div className='w-full'>
            <label htmlFor="file">E-mail</label>
            <input
              id="email"
              type="text"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="p-2 border-2 border-black w-full"
            />
          </div>

          <div className='w-full'>
            <label htmlFor="phone">Телефон</label>
            <input
              id="phone"
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="p-2 border-2 border-black w-full"
            />
          </div>

          <div className='w-full'>
            <label htmlFor="url_social_media">Ссылка на профиль фаундера в Facebook</label>
            <input
              id="url_social_media"
              type="text"
              name="url_social_media"
              required
              value={formData.url_social_media}
              onChange={handleChange}
              className="p-2 border-2 border-black w-full"
            />
          </div>

          <div className='w-full flex flex-reverse gap-3'>
            <label htmlFor="agree_terms">Подтверждаю согласие на обработку персональных данных</label>
            <input
              id="agree_terms"
              type="checkbox"
              name="agree_terms"
              required
              checked={formData.agree_terms}
              onChange={handleChange}
              className="w-6 h-6 accent-purple-900"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-900 text-white p-2 disabled:opacity-50 cursor-pointer">
            Отправить заявку
          </button>
        </form>
      </div>
    </Container>
  )
}

export default EventSpeaker