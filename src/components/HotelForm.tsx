import React, { useState, useContext } from "react"
import { HotelContext } from "../context/HotelContext"
import { useNavigate } from "react-router-dom"
import { NewHotel } from "../models/hotel"


const HotelForm: React.FC = () => {
  const context = useContext(HotelContext) // Доступ к контексту отелей
  const navigate = useNavigate() // Для перехода между страницами

  const [newHotel, setNewHotel] = useState<NewHotel>({
    name: "",
    description: "",
    city: "",
    address: "",
    starRating: 1,
    imageUrl: "",
    imageFile: null,
    imagePreview: "",
  })

  // Обработчик выбора изображения
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewHotel((prev) => ({ ...prev, imageFile: file }))

      // Читаем файл и создаём превью
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewHotel((prev) => ({ ...prev, imagePreview: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (context) {
      // Добавляем новый отель в глобальное состояние
      context.addHotel({
        ...newHotel,
        starRating: Number(newHotel.starRating), // Приводим рейтинг к числу
      })

      // Сбрасываем форму
      setNewHotel({
        name: "",
        description: "",
        city: "",
        address: "",
        starRating: 1,
        imageUrl: "",
        imageFile: null,
        imagePreview: "",
      })

      // Переход на главную страницу
      navigate("/")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добавление нового отеля</h2>
      <div>
        <input
          type="text"
          placeholder="Название"
          value={newHotel.name}
          required
          onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
        />
      </div>
      <div>
        <textarea
          placeholder="Описание"
          value={newHotel.description}
          required
          onChange={(e) => setNewHotel({ ...newHotel, description: e.target.value })}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Город"
          value={newHotel.city}
          required
          onChange={(e) => setNewHotel({ ...newHotel, city: e.target.value })}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Адрес"
          value={newHotel.address}
          required
          onChange={(e) => setNewHotel({ ...newHotel, address: e.target.value })}
        />
      </div>
      <div>
        <p>Кол-во звезд (1-5):</p>
        <input
          type="number"
          placeholder="Кол-во звезд (1-5)"
          min="1"
          max="5"
          value={newHotel.starRating}
          required
          onChange={(e) => setNewHotel({ ...newHotel, starRating: Number(e.target.value) })}
        />
      </div>
      <div>
        <p>Изображение:</p>
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        {newHotel.imagePreview && (
          <div>
            <p>Превью:</p>
            <img src={newHotel.imagePreview} alt="Preview" style={{ width: "150px", height: "auto" }} />
          </div>
        )}
      </div>
      <button type="submit">Добавить отель</button>
      <button type="button" onClick={() => navigate("/")}>
        Назад
      </button>
    </form>
  )
}

export default HotelForm