import React, { useContext } from "react"
import { HotelContext } from "../context/HotelContext"
import { Link, useNavigate } from "react-router-dom"

const HotelsList: React.FC = () => {
    const context = useContext(HotelContext)
    const navigate = useNavigate()

    if (!context) return <div>Контекст недоступен.</div>
    const { hotels } = context

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<img key={i} src="../star.png" alt="star" style={{ width: '20px', height: '20px' }} />);
        }
        return stars;
    };

    return (
        <div>
            <h1>Список отелей</h1>
            <ul>
                {hotels.map((hotel) => (
                    <li key={hotel.id}>
                        <h2>{hotel.name}</h2>
                        <div>{renderStars(hotel.starRating)}</div>
                        <p><b>Город:</b> {hotel.city}</p>
                        <img src={hotel.imageUrl} alt={hotel.name}></img>
                        <div>
                            <Link to={`/hotels/${hotel.id}`}>Просмотреть детали</Link>  
                            <Link to={`/hotels/delete/${hotel.id}`} style={{ marginLeft: "10px", color: "red" }}>
                            Удалить
                            </Link>
                        </div> 
                    </li> 
                ))}
            </ul>
        </div>
    );
};

export default HotelsList;
