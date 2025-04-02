import { data, useParams } from "react-router-dom";
import Container from "../components/Container";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../utils/consts";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const fetchEvent = async (id) => {
  const response = await axios.get(`${API_URL}/events/${id}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      'Cache-Control': 'no-cache'
    },
    withCredentials: true // Для отправки кук (если нужна аутентификация)
  });
  return response.data;
};

const registerForEvent = async (data) => {
  const response = await axios.post(`${API_URL}/register-event`, data, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      'Cache-Control': 'no-cache'
    },
    withCredentials: true // Аналог credentials: 'include' в fetch
  });
  return response.data;
};

const EventRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    telegram: "",
    company: "",
    agree_personal_data: false,
    agree_terms: false,
  });

  const registerMutation = useMutation({
    mutationFn: (data) => registerForEvent(data),
    onSuccess: () => {
      toast.success("Регистрация прошла успешно!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Произошла ошибка при регистрации"
      );
    },
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.full_name ||
      !formData.email ||
      !formData.phone ||
      !formData.telegram ||
      !formData.agree_personal_data ||
      !formData.agree_terms
    ) {
      toast.error("Пожалуйста, заполните все поля");
      return;
    }

    registerMutation.mutate({
      ...formData,
      event_id: Number(id),
    });
  };

  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEvent(id),
  });
  console.log(data);
  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;
  return (
    <Container>
      <div className="flex flex-col gap-4 mt-10">
        <h1 className="text-4xl text-center font-bold">
          Регистрация на встречу
        </h1>
        <div
          className="bg-cover bg-center text-white p-4 min-h-[300px] flex flex-col justify-center gap-4"
          style={{
            backgroundImage: `url(${data.image_url})`,
          }}
        >
          <h2 className="text-3xl">
            <span>{data.location}</span>
            <br />
            {/* <span>{data.title}, </span> */}
          </h2>
          <p className="text-3xl">
            {new Date(data.date).toLocaleDateString("ru-RU", {
              day: 'numeric',
              month: 'long',
            })}, {data.time}
          </p>
          <p className="text-3xl">{data.title}</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 mt-10 md:w-1/2 mx-auto mb-10"
      >
        <input
          type="text"
          placeholder="Имя"
          name="full_name"
          required
          value={formData.full_name}
          onChange={handleChange}
          className="p-2 border-2 border-black"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="p-2 border-2 border-black"
        />
        <input
          type="text"
          placeholder="Телефон"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="p-2 border-2 border-black"
        />
        <input
          type="text"
          placeholder="Telegram"
          name="telegram"
          required
          value={formData.telegram}
          onChange={handleChange}
          className="p-2 border-2 border-black"
        />
        <input
          type="text"
          placeholder="Компания"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="p-2 border-2 border-black"
        />
        <div className="flex gap-4">
          <input
            type="checkbox"
            name="agree_personal_data"
            required
            checked={formData.agree_personal_data}
            onChange={handleChange}
            className="w-6 h-6 accent-purple-900"
          />
          <p>Согласен на обработку персональных данных</p>
        </div>
        <div className="flex gap-4">
          <input
            type="checkbox"
            name="agree_terms"
            required
            checked={formData.agree_terms}
            onChange={handleChange}
            className="w-6 h-6 accent-purple-900"
          />
          <p>Согласен с условиями использования</p>
        </div>
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="bg-purple-900 text-white p-2 disabled:opacity-50 cursor-pointer"
        >
          Зарегистрироваться
        </button>
      </form>
    </Container>
  );
};

export default EventRegistration;
