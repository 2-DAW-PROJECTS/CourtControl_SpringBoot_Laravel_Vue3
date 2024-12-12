import axios from 'axios';

const API_URL = 'http://localhost:8085/api/auth';

class CourtService {
    async login(user) {
        const response = await axios.post(`${API_URL}/login`,{
            email: user.email,
            password: user.password,
        });
//hacer el handle error para manejar posibles respuestas del server.
//meter en el store console log para ver el valor realque devuelve la API
        console.log(response);
        return response;
    }




    async register(user) {

        return "llega al register del service con " , user;
//         const response = await axios.post(`${API_URL}/register`,{
//             username: user.username,
//             email: user.email,
//             password: user.password,
//         });
// //hacer el handle error para manejar posibles respuestas del server.
// //meter en el store console log para ver el valor realque devuelve la API
//         console.log(response);        
//         return response;
    }

}

export default new CourtService();