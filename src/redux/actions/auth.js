
import auth from "@react-native-firebase/auth"

export const clearMessage = () => {
  return {
    type: "CLEAR_MESSAGE"
  }
}

export const register = (data) => {
  const { email, password } = data
  return {
    type: "REGISTER",
    payload: auth()
      .createUserWithEmailAndPassword(email, password)
  }
}
export const login = (data) => {
  const { email, password } = data
  return {
    type: "LOG_IN",
    payload: auth().signInWithEmailAndPassword(email, password)
  }
}
export const logout = () => {
  return {
    type: "LOG_OUT",
    payload: auth().signOut()
  }
}