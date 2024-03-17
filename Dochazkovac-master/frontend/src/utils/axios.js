import axios from 'axios';

export default async function send(http, data) {
    try {
        const response = await axios({
            url: `http://localhost:3000/${http.url}`,
            method: http.method,
            data: JSON.stringify(data),
            headers:{
                "content-type":"application/json"
            }
        });

        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}