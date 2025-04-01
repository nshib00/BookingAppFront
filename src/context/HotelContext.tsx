import React, { createContext, useState, useEffect, ReactNode } from "react"
import ApiService from "../services/APIService"
import { Hotel } from "../models/hotel"

interface HotelContextProps {
  hotels: Hotel[]
  addHotel: (hotel: Omit<Hotel, "id">) => void
  updateHotel: (updatedHotel: Hotel) => void
  deleteHotel: (id: number) => void
}

export const HotelContext = createContext<HotelContextProps | undefined>(undefined)

export const HotelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hotels, setHotels] = useState<Hotel[]>([])

  useEffect(() => {
    fetchHotels()
  }, [])

  const fetchHotels = async () => {
    const data = await ApiService.getHotels()
    setHotels(data || [])
  }

  const addHotel = async (hotel: Omit<Hotel, "id">) => {
    const newHotel = await ApiService.createHotel(hotel)
    setHotels([...hotels, newHotel])
  }

  const updateHotel = async (updatedHotel: Hotel) => {
    await ApiService.updateHotel(updatedHotel.id, updatedHotel)
    setHotels(hotels.map((hotel) => (hotel.id === updatedHotel.id ? updatedHotel : hotel)))
  }
  
  const deleteHotel = async (id: number) => {
    await ApiService.deleteHotel(id)
    setHotels(hotels.filter((hotel) => hotel.id !== id))
  }

  return (
    <HotelContext.Provider value={{ hotels, addHotel, updateHotel, deleteHotel }}>
      {children}
    </HotelContext.Provider>
  )
}
