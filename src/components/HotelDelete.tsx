import React, { useContext } from "react"
import { HotelContext } from "../context/HotelContext"
import { useNavigate, useParams } from "react-router-dom"

const HotelDelete: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const context = useContext(HotelContext)
  const navigate = useNavigate()

  if (!context) return <div>Контекст недоступен.</div>

  const hotel = context.hotels.find((hotel) => hotel.id === Number(id))

  const handleDelete = () => {
    if (hotel) {
      context.deleteHotel(hotel.id)
      navigate("/")
    }
  }

  if (!hotel) return <div>Отель не найден.</div>

  return (
    <div>
      <h2>Вы уверены, что хотите удалить отель "{hotel.name}"?</h2>
      <button onClick={handleDelete}>Да</button>
      <button onClick={() => navigate("/")}>Отмена</button>
    </div>
  )
}

export default HotelDelete
