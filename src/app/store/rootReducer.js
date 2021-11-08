import { combineReducers } from "redux"
import authReducer from "../../features/auth/authReducer"
import eventReducer from "../../features/events/eventReducer"
import modalReducer from "../common/modals/modalReducer"

const rootReducer = combineReducers({
  event: eventReducer,
  modals: modalReducer,
  auth: authReducer,
})

export default rootReducer
