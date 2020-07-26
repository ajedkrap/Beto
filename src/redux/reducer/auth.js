import firestore from "@react-native-firebase/firestore"

const initialState = {
  isLoading: false,
  isError: false,
  isLogin: false,
  message: null,
  getUid: null,
  authData: {},
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_MESSAGE": {
      return {
        ...state,
        message: null,
        getUid: null
      }
    }
    case "REGISTER_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case "REGISTER_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload
      }
    }
    case "REGISTER_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: action.payload,
        getUid: action.payload.user.uid
      }
    }
    case "LOG_IN_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case "LOG_IN_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload
      }
    }
    case "LOG_IN_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLogin: true,
        authData: action.payload.user,
      }
    }
    case "LOG_OUT_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case "LOG_OUT_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload
      }
    }
    case "LOG_OUT_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLogin: false,
        authData: {}
      }
    }
    default: {
      return state
    }
  }
}

export default auth