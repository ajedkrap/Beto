const initialState = {
  isLoading: false,
  isError: false
}

const profile = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_PROFILE_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case "CREATE_PROFILE_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    }
    case "CREATE_PROFILE_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    }
    default: {
      return state
    }
  }
}

export default profile