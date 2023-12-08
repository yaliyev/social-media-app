import axios from "axios";

const API_URL = "https://656ea41d6529ec1c62366b24.mockapi.io/users/";



async function register(user){
   return await  axios.post(API_URL,user);
}

async function putUser(user){
    return await axios.put(API_URL+user.id,user);
}

async function login(user){
   let data = await axios.get(API_URL).then(response=>response.data);
   let resultUser = data.find((userIterated)=>userIterated.username == user.username && userIterated.password == user.password);

   if(resultUser == undefined){
       return false;
   }else{
       return true;
   }
}

async function getUser(user){
    let data = await axios.get(API_URL).then(response=>response.data);
    let resultUser = data.find((userIterated)=>userIterated.username == user.username);

    return resultUser;

}
async function getUserById(id){
    let data = await axios.get(API_URL).then(response=>response.data);
    let resultUser = data.find((userIterated)=>userIterated.id == id);

    return resultUser;
}

async function isExist(user){
    const userExistDetails = {isExistUsername: false,isExistEmail: false};
   let data = await axios.get(API_URL).then(response=>response.data);
   let resultUser = data.find((userIterated)=>userIterated.username == user.username);
   let resultUserEmail = data.find((userIterated)=>userIterated.email == user.email);
   if(resultUser != undefined){
       userExistDetails.isExistUsername = true;
   }
   if(resultUserEmail != undefined){
       userExistDetails.isExistEmail = true;
   }

   return userExistDetails;


}


export {register,login,isExist,getUser,getUserById,putUser}

