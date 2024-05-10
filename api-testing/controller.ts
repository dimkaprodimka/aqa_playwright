import axios from "axios"

export class ApiControllers {
    // https://dummyjson.com/users/1
    async getUserById(userId: any) {
        let r = await axios.get(`https://dummyjson.com/users/${userId}`);
        expect(r.status).toBe(200)
    }
}