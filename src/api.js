const base = 'https://api.instagram.com';

const tokenized = url => token => `${url}?access_token=${token}`

export default {
    auth: (clientId, redirectUri) => base + `/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`,
    media: tokenized(base + '/v1/users/self/media/recent/')
}
