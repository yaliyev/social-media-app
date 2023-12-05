import axios from "axios";

const API_URL = "https://656ea41d6529ec1c62366b24.mockapi.io/users";

async function register(user){
   return await  axios.post(API_URL,user);
}

export {register}

