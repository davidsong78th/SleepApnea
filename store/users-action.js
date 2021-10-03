export const ADD_USERS = 'ADD_USERS'
export const SET_USERS = 'SET_USERS'
export const DELETE_USERS = 'DELETE_USERS'
import { insertUser, fetchUsers, deleteUser } from '../helpers/db';


export const addUser = (title, document, dateCreated) => {
    return async (dispatch) => {
        try {
            const dbResult = await insertUser(title, document, dateCreated, 23.1)
            console.log(dbResult)
            dispatch({
                type: ADD_USERS,
                userData: {
                    id: dbResult.insertId,
                    title: title,
                    document: document,
                    dateCreated: dateCreated
                }
            })
        } catch (err) {
            throw err
        }
    }

}

export const deleteUsers = (id) => {
    return async dispatch => {
        try {
            const dbResult = await deleteUser(id)
            //console.log(dbResult)
            dispatch({
                type: DELETE_USERS,
                id: id
            })
        } catch (err) {
            throw err
        }
    }
}

export const loadUsers = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchUsers()
            //console.log(dbResult)
            dispatch({
                type: SET_USERS,
                users: dbResult.rows._array
            })
        } catch (err) {
            throw err
        }
    }
}
