const base = "https://api.instagram.com";
const clientId = "e6e4168f12aa4bebbe95c6d10802675e";
const redirectUri = `http://${location.host}${location.pathname}callback.html`;

const makeUrl = (url, token) => `${base}${url}?access_token=${token}`;

function ApiClient() {
  let token = localStorage.getItem("instagram-token");
  this.auth = () =>
    base +
      `/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=public_content`;
  this.media = () => makeUrl("/v1/users/self/media/recent/", token);
  // this.media = () => makeUrl("/v1/users/281422821/media/recent/", token);
  // this.media = () => makeUrl("/v1/users/178703389/media/recent/", token);
  this.search = query => makeUrl("/v1/users/search", token) + `&q=${query}`;
  this.getToken = () => token;
  this.setToken = value => {
    localStorage.setItem("instagram-token", value);
    token = value;
  };
}

export default new ApiClient();
