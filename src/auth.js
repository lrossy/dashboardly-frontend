import api from './api';

module.exports = {
  login(email, pass) {
    if (localStorage.token) {
      // throw new Error('Already logged in')
      return Promise.reject('Already logged in');
    }
    else {
      return api.requestLogin(email, pass)
      .then(res => localStorage.token = res.body.token)
      .catch((error) => {return error.response.body })
    }
  },
  signup(email, pass) {
    if (localStorage.token) {
      throw new Error('Already logged in')
    }
    else {
      return api.requestSignup(email, pass)
          .then(res => {
            console.log('res', res);
            return res;
          })
          .catch((error) => {return error.response.body })
    }
  },
  getToken() {
    return localStorage.token
  },

  logout() {
    return api.requestLogout(localStorage.token)
    .then(res => delete localStorage.token)
  },
  userInfo() {
    if(localStorage.token){
      return api.getUserInfo(localStorage.token)
          .then(res => {
            //console.log('res.body', res.body);
            return res.body})
    }
  },
  isLoggedIn() {
    return !!localStorage.token
  },
  
}
