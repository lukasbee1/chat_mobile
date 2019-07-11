import { LAN } from 'react-native-dotenv';
import {
  chatsUpdated,
  clientsUpdated,
  saveMessages,
  setActiveId,
  createChat,
  reduxSignIn,
  setEmit,
} from './actions';

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

export const getMessages = id => dispatch => {
  return fetch(`http://${LAN}:8080/api/messages/id${id}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(messages => {
      dispatch(saveMessages({ messages, id }));
      dispatch(setActiveId(id));
      dispatch(setEmit('activeChat', id));
    })
    .catch(error => {
      console.log('error', error);
    });
};
export const postCreateChat = obj => dispatch => {
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
      dispatch(getMessages(chat.id));
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
