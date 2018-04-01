const endpoint = 'http://localhost:8080/api/client';


class ClientService {


    static create(clientRequest) {

        const request = new Request(endpoint + '/', {
            headers: {
                'Content-Type': 'application/json'
            },

            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(clientRequest)
        });

        return fetch(request).then(response => {
            console.log(response)
            return response;

        }).catch(error => {
            console.log(error)
            return error;
        });

    }

    static edit(clientRequest, id) {

        const request = new Request(endpoint + '/' + id, {
            headers: {
                'Content-Type': 'application/json'
            },

            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(clientRequest)
        });

        return fetch(request).then(response => {
            console.log(response)
            return response;

        }).catch(error => {
            console.log(error)
            return error;
        });

    }

    static listAll() {

        const request = new Request(endpoint + '/', {
            method: 'GET',
            mode: 'cors',
        });
        return fetch(request).then(response => {
            console.log(response)
            return response.json().then((jsonResponse) => {
                return jsonResponse;
            })

        }).catch(error => {
            console.log(error)
            return error;
        });
    }


    static delete(id) {
        const request = new Request(endpoint + '/' + id, {
            method: 'DELETE',
            mode: 'cors',
        });

        return fetch(request).then(response => {
            console.log(response)
            return response;

        }).catch(error => {
            console.log(error)
            return error;
        });
    }

}

export default ClientService;