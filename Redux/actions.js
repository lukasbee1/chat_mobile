// import history from '../../history';
import av from '../img/download.jpeg';
import { LAN } from 'react-native-dotenv';

export const initSocketConnection = socket => ({
  type: 'INIT_SOCKET_CONNECTION',
  payload: socket,
});

export const sendMessage = message => ({
  type: 'SEND_MESSAGE',
  payload: message,
});

export const reduxAddChat = chat => ({
  type: 'ADD_CHAT',
  payload: chat,
});
export const reduxSignIn = user => ({
  type: 'SIGN_IN',
  payload: user,
});
export const clientsUpdated = users => ({
  type: 'CLIENTS_UPDATED',
  payload: users,
});
export const chatsUpdated = chats => ({
  type: 'CHATS_UPDATED',
  payload: chats,
});
export const saveMessages = obj => ({
  type: 'SAVE_MESSAGES',
  payload: obj,
});
export const setActiveId = id => ({
  type: 'SET_ACTIVE_ID',
  payload: id,
});
export const setEmit = (event, ...args) => (dispatch, getState) => {
  console.log('setEmit');
  const { client } = getState();
  const sock = client;
  sock.emit(event, ...args);
  dispatch(initSocketConnection(sock));
};
export const createChat = chat => ({
  type: 'CREATE_CHAT',
  payload: chat,
});

export const getChats = id => dispatch => {
  fetch(`http://${LAN}:8080/api/chatsList/userId${id}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(rooms => {
      dispatch(chatsUpdated(rooms));
    })
    .catch(error => {
      console.log('Api call error, getChats');
      alert(error.message);
    });
};

export const getUsers = () => dispatch => {
  fetch(`http://${LAN}:8080/api/usersList`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(users => {
      dispatch(clientsUpdated(users));
    })
    .catch(error => {
      console.log('Api call error');
      alert(error.message);
    });
};

export const getChat = id => dispatch => {
  return fetch(`http://${LAN}:8080/api/messages/id${id}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(messages => {
      dispatch(saveMessages({ messages, id }));
      dispatch(setActiveId(id));
    })
    .catch(error => {
      console.log('error', error);
    });
};
export const postCreateChat = obj => (dispatch, getState) => {
  return fetch(`http://${LAN}:8080/createChat`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(chat => {
      dispatch(createChat(chat));
      dispatch(getChat(chat.id));
    })
    .catch(error => {
      console.log('error', error);
    });
};

export const postLogin = obj => dispatch => {
  fetch(`http://${LAN}:8080/login`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => {
      return dispatch(reduxSignIn(data));
      // localStorage.setItem('email', data.email);
      // localStorage.setItem('id', data.id);
      // localStorage.setItem('uniqueId', data.uniqueId);
      // localStorage.setItem('avatar', data.avatar);
      // history.push('/messanger');
    })
    .then(() => true)
    .catch(error => {
      console.log('Api call error');
      alert(error.message);
    });
};
