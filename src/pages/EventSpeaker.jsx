import React, { useState, useRef } from 'react'
import Container from '../components/Container'
import axios from 'axios';
import { API_URL } from '../utils/consts';
import SelectStage from '../components/UI/select/SelectStage';
import stage from '../data/stages.json'

const EventSpeaker = () => {

  const inputRef = useRef();
  const [formDataContact, setFormDataContact] = useState({
    name: '',
    second_name: '',
    email: '',
    phone: '',
    url_social_media: '',
    agree_items: 'false'
  })

  const [formDataRequest, setFormDataRequest] = useState({
    city: '',
    name_startup: '',
    url_site: '',
    stage: '',
    description_startap: '',
    buisness: '',
    presentation: '',
    files: []
  })
  console.log(formDataRequest.files)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formDataContact.name ||
      !formDataContact.second_name ||
      !formDataContact.email ||
      !formDataContact.phone ||
      !formDataContact.url_social_media ||
      !formDataContact.agree_items ||
      !formDataRequest.city ||
      !formDataRequest.name_startup ||
      !formDataRequest.url_site ||
      !formDataRequest.stage ||
      !formDataRequest.description_startap ||
      !formDataRequest.buisness ||
      !formDataRequest.presentation ||
      !formDataRequest.files
    ) {
      toast.error("Пожалуйста, заполните все поля");
    }

    try {
      await axios.post(`${API_URL}/pitch-contact-form`, formDataContact, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      });

      const requestFormData = new FormData();
      Object.entries(formDataRequest).forEach(([key, value]) => {
        if (value !== null) {
          requestFormData.append(key, value);
        }
      });

      await axios.post(`${API_URL}/pitches-requests`, requestFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        },
        withCredentials: true
      });

      alert("Данные успешно отправлены!");
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      alert("Произошла ошибка при отправке данных");
    }
  };

  const handleChangeContact = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormDataContact({
      ...formDataContact,
      [e.target.name]: value
    })
  };

  const handleChangeRequest = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormDataRequest({
      ...formDataRequest,
      [e.target.name]: value
    })
  };

  const handleSelect = (selectedValue) => {
    setFormDataRequest(prevState => ({
      ...prevState,
      stage: selectedValue
    }));
  }

  const handleChangeFile = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormDataRequest(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles]
    }));
    inputRef.current.value = '';
  };

  return (
    <Container>
      <div>
        <h1>Заявка на питч</h1>
        <p>Заполните и отправьте форму. Мы свяжемся с вами и предложим даты, когда вы сможете сделать питч вашего проекта.</p>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 mt-10 md:w-1/2 mx-auto mb-10">

          <label htmlFor="city">В каком городе и в какой день вы бы хотели выступить?</label>
          <input
            id="city"
            type="text"
            name="city"
            required
            value={formDataRequest.city}
            onChange={handleChangeRequest}
            className="p-2 border-2 border-black"
          />

          <label htmlFor="name_startup">Название стартапа</label>
          <input
            id="name_startup"
            type="text"
            name="name_startup"
            required
            value={formDataRequest.name_startup}
            onChange={handleChangeRequest}
            className="p-2 border-2 border-black"
          />

          <label htmlFor="url_site">Ссылка на сайт (если есть)</label>
          <input
            id="url_site"
            type="text"
            name="url_site"
            required
            value={formDataRequest.url_site}
            onChange={handleChangeRequest}
            className="p-2 border-2 border-black"
          />

          <SelectStage
            option={stage.map(option => ({
              name: option.stage,
              id: option.id
            }))}
            defaultValue={'Выберете...'}
            onChange={handleSelect}
            value={formDataRequest.stage} />

          <textarea
            id="description_startap"
            type="text"
            name="description_startap"
            required
            value={formDataRequest.description_startap}
            onChange={handleChangeRequest}
            className="p-2 border-2 border-black overflow-hidden resize-none">
          </textarea>

          <textarea
            id="buisness"
            type="text"
            name="buisness"
            required
            value={formDataRequest.buisness}
            onChange={handleChangeRequest}
            className="p-2 border-2 border-black overflow-hidden resize-none">
          </textarea>

          <label htmlFor="url_site">Теги (ниши) через запятую</label>
          <input
            id="presentation"
            type="text"
            name="presentation"
            required
            value={formDataRequest.presentation}
            onChange={handleChangeRequest}
            className="p-2 border-2 border-black"
          />

          <input
            type="file"
            ref={inputRef}
            onChange={handleChangeFile}
            multiple
          />
          <div>
            {formDataRequest.files.map((file, i) => (
              <div key={i}>
                {file.name}
              </div>
            ))}
          </div>
        </form>
      </div>
    </Container>
  )
}

export default EventSpeaker