const av = 'https://image.flaticon.com/icons/svg/74/74472.svg';

const initialState = {
  client: null,
  activeId: null,
  user: {
    name: '',
    email: '',
    uniqueId: '',
    id: null,
    avatar: av,
  },
  friends: [],
  blockedUsers: [],
  // chats: [],
  chats: {},
  chatsList: [],
  usersList: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_CHAT':
      return {
        ...state,
        // chats: [...this.state.chats, action.payload],
        // chats: {
        //   ...state.chats,
        //   [action.payload.id]: action.payload.users,
        // }
        chatsList: [...state.chatsList, action.payload],
      };
    case 'SET_ACTIVE_ID':
      return {
        ...state,
        activeId: action.payload,
      };
    case 'SEND_MESSAGE':
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.id]: [
            ...state.chats[action.payload.id],
            action.payload,
          ],
        },
      };
    case 'SAVE_MESSAGES': {
      const arr = [];
      action.payload.messages.forEach(obj => {
        if (!obj.Sender.avatar) {
          const newObj = obj;
          newObj.Sender.avatar = av;
          arr.push(newObj);
        } else arr.push(obj);
      });
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.id]: arr,
        },
      };
    }
    case 'CLIENTS_UPDATED':
      return {
        ...state,
        usersList: action.payload,
      };
    case 'CHATS_UPDATED':
      return {
        ...state,
        chatsList: action.payload,
      };
    case 'INIT_SOCKET_CONNECTION':
      return {
        ...state,
        client: action.payload,
      };

    case 'SIGN_IN': {
      if (!action.payload.avatar) {
        const obj = action.payload;
        obj.avatar = av;
        return {
          ...state,
          user: obj,
        };
      }
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'DELETE_USER':
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
}
