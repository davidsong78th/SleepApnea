import { ADD_USERS, SET_USERS, DELETE_USERS } from "./users-action"
import User from "../models/user"

const initialState = {
    users: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USERS:
            const newUser = new User(action.userData.id.toString(), action.userData.title, action.userData.ECGLog, action.userData.EEGLog,
                action.userData.OxymeterLog, action.userData.PressureLog, action.userData.FlowLog, action.userData.SnoreLog, action.userData.dateCreated)
            return {
                users: state.users.concat(newUser)
            }
        case SET_USERS:
            return {
                users: action.users.map(user => new User(user.id.toString(), user.title, user.ECGLog, user.EEGLog,
                    user.OxymeterLog, user.PressureLog, user.FlowLog, user.SnoreLog, user.dateCreated))
            }
        case DELETE_USERS:
            return {
                users: state.users.filter(user => user.id !== action.id)
            }
        default:
            return state
    }
}
