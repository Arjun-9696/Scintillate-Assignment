import React from 'react'
import { Routes, Route } from "react-router-dom"
import Error from '../Pages/Error'
import Favorite from '../Pages/Favorite'
import People from '../Pages/People'
import PeoplePage from '../Pages/PeoplePage'
const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<People />} />
            <Route path="/movienames" element={<PeoplePage />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="*" element={<Error />} />
        </Routes>
    )
}

export default AllRoutes