import axios from "axios"
import jsonpath from "jsonpath"
import fs from "fs-extra"
import jsonData from "../api-data.json"

let userName: String;
let userPass: String;

describe("tests for users", () => {
    test("get all users", async () => {
        const all_users_response = await axios.get('https://dummyjson.com/users');
        userName = String(
            jsonpath.query(all_users_response.data, "$..users[3].username")
        )
        userPass = String(
            jsonpath.query(all_users_response.data, "$..users[3].password")
        )
    })

    test("get auth token", async () => {
        const auth_token_respopnse = await axios.post(
            `${jsonData.baseUrl}/auth/login`,
            {username: userName,
            password: userPass,
            expiresMin: 30
            },
    
            {headers: {
                "ContentType": "application/json"
            }
            }
        )
        jsonData.token = auth_token_respopnse.data.token;
        fs.writeJsonSync("api-data.json", jsonData)
    })

    test("get current user", async () => {
        let responseT = await axios.get(`${jsonData.baseUrl}/user/me}`, {
                headers: {
                    "Authorization": `Bearer ${jsonData.token}`
                }
            })
        expect(responseT.status).toBe(200)
    })
})