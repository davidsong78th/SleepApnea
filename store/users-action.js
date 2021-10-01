export const ADD_USERS = 'ADD_USERS'
export const SET_USERS = 'SET_USERS'
export const DELETE_USERS = 'DELETE_USERS'
import { insertUser, fetchUsers, deleteUser } from '../helpers/db';
import * as FileSystem from 'expo-file-system';


export const addUser = (title, image, document, dateCreated) => {
    return async (dispatch) => {
        const fileName = image.split('/').pop()
        // someFolder/myimage.jpg => ['someFolder', 'myimage.jpg'] => myimage.jpg
        const newImagePath = FileSystem.documentDirectory + fileName
        //FileSystem.documentDirectory ends with a /. That's why we + fileName

        const newDocumentPath = document
        try {
            await FileSystem.moveAsync({
                from: image,
                to: newImagePath
            })
            const dbResult = await insertUser(title, newImagePath, newDocumentPath, dateCreated, 23.1)
            console.log(dbResult)
            dispatch({
                type: ADD_USERS,
                userData: {
                    title: title,
                    image: newImagePath,
                    id: dbResult.insertId,
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
            console.log(dbResult)
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
            console.log(dbResult)
            dispatch({
                type: SET_USERS,
                users: dbResult.rows._array
            })
        } catch (err) {
            throw err
        }
    }
}
