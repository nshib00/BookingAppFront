import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { HotelProvider } from "./context/HotelContext"
import HotelsList from "./components/HotelsList"
import HotelForm from "./components/HotelForm"
import HotelDetails from "./components/HotelDetails"
import HotelUpdate from "./components/HotelUpdate" 
import HotelDelete from "./components/HotelDelete"


const App: React.FC = () => {
  return (
    <HotelProvider>
      <Router>
        <h1>Бронирование отелей</h1>
        <Routes>
          <Route path="/" element={<HotelsList />}/>
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="hotels/add" element={<HotelForm />} />
          <Route path="hotels/update/:id" element={<HotelUpdate />} />
          <Route path="hotels/delete/:id" element={<HotelDelete />} />
        </Routes>
      </Router>
    </HotelProvider>
  )
}


export default App
 