import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
// import * as Expo from "expo";

// const db = Expo.SQLite.openDatabase('users.db')
const db = SQLite.openDatabase('users.db')

const DB_PATH = `${FileSystem.documentDirectory}SQLite/users.db`
console.log(DB_PATH)
// db._db.close();

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, document TEXT NOT NULL, dateCreated TEXT NOT NULL, lng REAL NOT NULL);',
                [],
                () => {
                    resolve()
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise

}

export const insertUser = (title, imageUri, document, dateCreated, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO users (title, imageUri, document, dateCreated, lng) VALUES (?, ?, ?, ?, ?);`,
                [title, imageUri, document, dateCreated, lng],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise
}

export const deleteUser = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM users WHERE id=?',
                [id],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise
}

export const fetchUsers = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM users',
                [],
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err)
                }
            )
        })
    })
    return promise
}