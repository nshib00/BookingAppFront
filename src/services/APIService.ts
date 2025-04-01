import { Hotel } from "../models/hotel";


class APIService {
    private baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }
    

    async getHotels(): Promise<Hotel[]> {
        const response = await fetch(`${this.baseUrl}/Hotel`)
        if (!response.ok)
            throw new Error("Failed to fetch hotels.")
        return await response.json()
    }

    async createHotel(hotel: Omit<Hotel, "id">): Promise<Hotel> {
        const response = await fetch(`${this.baseUrl}/Hotel`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(hotel),
          })
          if (!response.ok) throw new Error("Failed to create hotel.")
          return await response.json()
    }

    async updateHotel(id: number, updatedHotel: Hotel): Promise<Hotel> {
        const response = await fetch(`${this.baseUrl}/Hotel/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedHotel),
        })
        if (!response.ok) throw new Error("Failed to update hotel.")
        return await response.json()
      }
    
      async deleteHotel(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/Hotel/${id}`, {
          method: "DELETE",
        })
        if (!response.ok) throw new Error("Failed to delete hotel.")
      }
}

export default new APIService("/api") 