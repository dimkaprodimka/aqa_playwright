import axios from "axios"
import jsonData from "./api-data.json"
import { fakerEN } from "@faker-js/faker"
import { ApiControllers } from "./controller";

let fuserName = fakerEN.person.firstName();
let fuserLastName = fakerEN.person.lastName();
let fPhoneN = fakerEN.phone.number()

describe("tests for users", () => {
    const controllers = new ApiControllers()
    const apiClient = axios.create({
        baseURL: `${jsonData.baseUrl}`
    })

    apiClient.interceptors.request.use(function (config) {
        console.log(`Request url: ${config.baseURL}${config.url}`);
        return config
    })
    test("get current user", async () => {
        let responseT = await axios.get(`${jsonData.baseUrl}/user/me`, {
                headers: {
                    "Authorization": `Bearer ${jsonData.token}`
                }
            })
        expect(responseT.status).toBe(200)
    })

    test("put user data", async () => {
        let put_user = await axios.put(`${jsonData.baseUrl}/user`,
            {firstName: fuserName,
            lastName: fuserLastName,
            phone: fPhoneN
            })
    })

    test("use controller", async () => {
        await controllers.getUserById("4")
    })
})

