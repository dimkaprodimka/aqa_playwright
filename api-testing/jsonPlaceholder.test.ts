import axios from "axios";
import jsonpath from "jsonpath"

axios.interceptors.request.use(requestLog => {

    const headers = {
        ...requestLog.headers
    };

    const printable = `Request: ${requestLog.method?.toUpperCase()} | ${requestLog.url} | ${ JSON.stringify(headers)} | ${ JSON.stringify( requestLog.data) }`
    console.log(printable)

    return requestLog;
})

axios.interceptors.response.use(responseLog => {

    const printable = `Response: ${responseLog.status} | ${ JSON.stringify(responseLog.data) }`
    console.log(printable)

    return responseLog;
})

describe("tests for posts", () => {
    // checking the status, number of all posts and correct structure of every post
    test ("get all posts", async () => {
        const all_posts = await axios.get("https://jsonplaceholder.typicode.com/posts")
        let numberOfPosts = jsonpath.query(all_posts.data, '$..id').length
        let posts = jsonpath.query(all_posts.data, '$..[0]')
        expect(all_posts.status).toEqual(200)
        expect(numberOfPosts).toEqual(100)
        for (let post of posts) {
            expect(Object.keys(post)).toEqual([ 'userId', 'id', 'title', 'body' ])
        }
    })
    // checking first post status and data
    test ("get first post", async () => {
        const firstPost = await axios.get("https://jsonplaceholder.typicode.com/posts/1")
        let firstPostData = jsonpath.query(firstPost.data, '$')
        expect(firstPost.status).toEqual(200)
        expect(firstPostData[0]).toMatchObject({
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": `quia et suscipit
suscipit recusandae consequuntur expedita et cum
reprehenderit molestiae ut ut quas totam
nostrum rerum est autem sunt rem eveniet architecto`
          })
    })

    // checking, that new post is added and contains correct data
    test ("post a post", async () => {
        const newPost = await axios.post("https://jsonplaceholder.typicode.com/posts",
        {
            "userId": 1,
            "id": 101,
            "title": "my title",
            "body": "my comment"
          })
        expect(newPost.status).toEqual(201)
        expect(newPost.data).toMatchObject({ 
            userId: 1, 
            id: 101, 
            title: 'my title', 
            body: 'my comment' })
    })

    // checking, that first user has correct amount of posts
    test ("get number of posts of first user", async () => {
        const allPostsFirstUser = await axios.get("https://jsonplaceholder.typicode.com/posts?userId=1")
        let firstUserNumberOfPosts = jsonpath.query(allPostsFirstUser.data, '$..id').length
        expect(allPostsFirstUser.status).toEqual(200)
        expect(firstUserNumberOfPosts).toEqual(10)
    })

    // checking all posts titles of first user
    test ("get all posts titles of first user", async () => {
        const allPostsFirstUser = await axios.get("https://jsonplaceholder.typicode.com/posts?userId=1")
        let allPostsTitles = jsonpath.query(allPostsFirstUser.data, '$..title')
        expect(allPostsFirstUser.status).toEqual(200)
        expect(allPostsTitles).toEqual([
            'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            'qui est esse',
            'ea molestias quasi exercitationem repellat qui ipsa sit aut',
            'eum et est occaecati',
            'nesciunt quas odio',
            'dolorem eum magni eos aperiam quia',
            'magnam facilis autem',
            'dolorem dolore est ipsam',
            'nesciunt iure omnis dolorem tempora et accusantium',
            'optio molestias id quia eum'
          ])
    })
})