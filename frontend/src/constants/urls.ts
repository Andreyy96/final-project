const baseURL = 'http://localhost:3000'

const auth = '/auth'
const orders = "/orders"


const urls = {
    auth: {
        login: `${auth}/sign-in`,
        me: `${auth}/me`,
        refresh: `${auth}/refresh`
    },
    order: {
        getAll: (query: string): string =>  `${orders}${query}`
    }
}

export {
    baseURL,
    urls
}