import http from '../api/elofy'

const api = '/api/v1/people'

class PeopleService {

    findAll() {
        return http.get(api)
    }
}

export default new PeopleService()