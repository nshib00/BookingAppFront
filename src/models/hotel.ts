interface HotelBase {
    name: string;
    description: string;
    city: string;
    address: string;
    starRating: number;
    imageUrl: string;
}


export interface Hotel extends HotelBase {
    id: number;
}

export interface NewHotel extends HotelBase {
    imageFile: File | null
    imagePreview: string
}
