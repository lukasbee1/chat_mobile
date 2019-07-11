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
export const createChat = chat => ({
  type: 'CREATE_CHAT',
  payload: chat,
});
export const logOutAction = () => ({
  type: 'DELETE_USER',
});
export const onConnection = () => dispatch => {};

export const setEmit = (event, ...args) => (dispatch, getState) => {
  console.log('setEmit');
  const { client } = getState();
  const sock = client;
  sock.emit(event, ...args);
  dispatch(initSocketConnection(sock));
};
