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
      dispatch(saveMessages(messages));
      dispatch(setActiveId(id));
      dispatch(setEmit('activeChat', id));
    })
    .catch(error => {
      console.log('error', error);
    });
};
export const postCreateChat = obj => dispatch => {
  if (!obj.avatar) {
    obj.avatar = 'img/group.png';
  }
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

export const postRegister = obj => dispatch => {
  if (!obj.avatar) {
    obj.avatar = 'img/download.jpeg';
  }
  fetch(`http://${LAN}:8080/register`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        return dispatch(reduxSignIn(data));
      }
      alert(data.error);
      return data.error;
    })
    .catch(error => {
      console.log('Api call error');
      alert(error.message);
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
      console.log(data);
      if (data.uniqueId) return dispatch(reduxSignIn(data));
      else {
        alert(data.error);
        return data.error;
      }
    })
    .catch(error => {
      console.log('Api call error');
      alert(error.message);
    });
};
