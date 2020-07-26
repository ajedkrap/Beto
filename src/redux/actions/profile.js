import firestore, { firebase } from '@react-native-firebase/firestore'
import pinGenerate from "../../utils/pinGenerator"
import moment from "moment"

export const createProfile = (data) => {
  const { name, image, email, uid } = data
  const userData = {
    bio: "",
    birthdate: moment(0).format("DD-MM-YYYY"),
    email,
    image,
    isLogin: false,
    lastUpdate: "0",
    location: new firebase.firestore.GeoPoint(0, 0),
    name,
    pin: pinGenerate()
  }
  return {
    type: "CREATE_PROFILE",
    payload: firestore().collection('users').doc(uid).set(userData)
  }
}
