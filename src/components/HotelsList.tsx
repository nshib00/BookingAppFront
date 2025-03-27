import { useState, useEffect } from 'react';


interface Hotel {
    id: number;
    name: string;
    description: string;
    city: string;
    address: string;
    starRating: number;
    imageUrl: string;
}

const HotelsList = () => {
    const [hotels, setProjects] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch('/api/Hotel')
            .then((response) => response.json())
            .then((data: Hotel[]) => {
                console.log(data)
                setProjects(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<img key={i} src="../star.png" alt="star" style={{ width: '20px', height: '20px' }} />);
        }
        return stars;
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div>
            <h1>Список отелей</h1>
            <ul>
                {}
                {hotels.map((hotel) => (
                    <li key={hotel.id}> {}
                        <h2>{hotel.name}</h2> {}
                        <div>{renderStars(hotel.starRating)}</div>
                        <p><b>Город:</b> {hotel.city}</p> {}
                        <p><b>Адрес:</b> {hotel.address}</p> {}
                        <p>{hotel.description}</p> {}
                        <img src={hotel.imageUrl}></img> {}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HotelsList;