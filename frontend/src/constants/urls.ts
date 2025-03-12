const baseURL = 'http://localhost:3000'

const auth = '/auth'
const orders = "/orders"
const comments = "/comments"
const groups = "/groups"


const urls = {
    auth: {
        login: `${auth}/sign-in`,
        me: `${auth}/me`,
        refresh: `${auth}/refresh`,
        logOut: `${auth}/sign-out`
    },
    order: {
        getAll: (query: string): string =>  `${orders}${query}`,
        updateById: (id: string): string => `${orders}/${id}`,
    },
    comment: {
        postComment: (id: string): string => `${comments}/${id}`
    },
    group: {
        getAll: groups,
        createGroup: groups
    }
}

export {
    baseURL,
    urls
}