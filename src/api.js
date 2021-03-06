import superagent from 'superagent'
import { API_HOST } from './config'

class Api {
  
  requestLogin = (email, password) => (
    superagent
    .post(`${API_HOST}/auth/sessions`)
    .send({ email, password })
  );

  requestSignup = (email, password) => (
      superagent
          .post(`${API_HOST}/auth/users`)
          .send({ email, password })
          .set('Accept', 'application/json')
  );

  requestLogout = (token) => (
    superagent
    .delete(`${API_HOST}/auth/sessions`)
    .send({token: token})
    .set('Authorization', `token ${token}`)
  );

  getUserInfo = (token) => (
    superagent
    .get(`${API_HOST}/auth/me`)
    .set('Authorization', `token ${token}`)
  );
  
  getBoardsList = (page, count) => (
    superagent
    .get(`${API_HOST}/boards`)
  );
  
  getBoard = (id) => (
    superagent
    .get(`${API_HOST}/boards/${id}`)
  );
  
  getBookmarks = (boardId) => (
    superagent
    .get(`${API_HOST}/boards/${boardId}/bookmarks`)
  );

  createBoard = (token, board) => (
      superagent
          .post(`${API_HOST}/boards`)
          .send(board)
          .set('Authorization', `token ${token}`)
  );
  editBoard = (token, board, boardId) => (
      superagent
          .patch(`${API_HOST}/boards/${boardId}`)
          .send(board)
          .set('Authorization', `token ${token}`)
  );
  createBookmark = (token, boardId, bookmark) => (
      superagent
          .post(`${API_HOST}/boards/${boardId}/bookmarks`)
          .send(bookmark)
          .set('Authorization', `token ${token}`)
  );
  
}

export default new Api();
