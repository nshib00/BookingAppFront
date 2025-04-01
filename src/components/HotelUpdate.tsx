import React, { useState, useContext, useEffect } from "react"
import { HotelContext } from "../context/HotelContext"
import { useNavigate, useParams } from "react-router-dom"
import { Hotel } from "../models/hotel"

const HotelUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const context = useContext(HotelContext)
  const navigate = useNavigate()

  const [hotel, setHotel] = useState<Hotel | null>(null)

  useEffect(() => {
    if (context) {
      const foundHotel = context.hotels.find((h) => h.id === Number(id))
      if (foundHotel) setHotel(foundHotel)
    }
  }, [context, id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (hotel) {
      setHotel({ ...hotel, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (context && hotel) {
      context.updateHotel(hotel)
      navigate("/")
    }
  }

  if (!hotel) return <p>Отель не найден.</p>

  return (
    <form onSubmit={handleSubmit}>
      <h2>Редактирование отеля</h2>
      <div>
        <input type="text" name="name" value={hotel.name} onChange={handleChange} required />
      </div>
      <div>
        <textarea name="description" value={hotel.description} onChange={handleChange} required />
      </div>
      <div>
        <input type="text" name="city" value={hotel.city} onChange={handleChange} required />
      </div>
       <div>
        <input type="text" name="address" value={hotel.address} onChange={handleChange} required />
      </div>
      <div>
        <input type="number" name="starRating" value={hotel.starRating} min="1" max="5" onChange={handleChange} required />
      </div>
      <div>
        <button type="submit">Обновить данные</button>
        <button type="button" onClick={() => navigate("/")}>Отмена</button>
      </div>
    </form>
  )
}

export default HotelUpdate
