import axios from 'axios';
export default async function(){
    const token = localStorage.getItem('token');
    if(token){
        var req = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try{
            const res = await axios.post('http://localhost:3000/users/session-validate',{}, req);
            return res;
        }
        catch(err){
            localStorage.removeItem('token');
            return false;
        }
    }
    return false;
}