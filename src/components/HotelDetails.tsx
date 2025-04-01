import React, { useEffect, useState, useContext } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { HotelContext } from "../context/HotelContext"
import { Hotel } from "../models/hotel"

const HotelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const context = useContext(HotelContext)
  const navigate = useNavigate()

  const [hotel, setHotel] = useState<Hotel | null>(null)

  useEffect(() => {
    if (context) {
      const foundHotel = context.hotels.find((hotel) => hotel.id === parseInt(id || "", 10))
      setHotel(foundHotel || null)
    }
  }, [context, id])

  if (!hotel) {
    return <div>Отель не найден.</div>
  }

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 0; i < rating; i++) {
      stars.push(<img key={i} src="../star.png" alt="star" style={{ width: "20px", height: "20px" }} />)
    }
    return stars
  }

  return (
    <div>
      <h2>{hotel.name}</h2>
      <div>{renderStars(hotel.starRating)}</div>
      <p><b>Город:</b> {hotel.city}</p>
      <p><b>Адрес:</b> {hotel.address}</p>
      <p>{hotel.description}</p>
      <img src={hotel.imageUrl} alt={hotel.name} />

      <div>
        <Link to={`/hotels/update/${hotel.id}`}>
          <button>Редактировать</button>
        </Link>

        <button onClick={() => navigate("/")}>Назад</button>
      </div>
    </div>
  )
}

export default HotelDetails
