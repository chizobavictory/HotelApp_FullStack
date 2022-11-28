import express from 'express';
import {auth} from "../middleware/auth"
const router = express.Router();

import { createHotels, deleteHotel, getHotels, getSingleHotel, updateHotels} from '../controller/hotelController';


/* GET hotel listing(routers). */
router.post('/create', auth, createHotels);
router.get('/read', getHotels);
router.get("/read/:id", getSingleHotel);
router.post("/update/:id", auth, updateHotels);
router.delete('/delete/:id', auth, deleteHotel)

export default router;
