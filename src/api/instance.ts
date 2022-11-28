import axios from "axios";

export const APIKey= '25d2f0229435d98d8edbe8e323ee58bd'

export const instance=axios.create({
    baseURL:'http://api.openweathermap.org',
})