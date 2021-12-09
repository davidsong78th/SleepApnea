import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('users.db')


export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, title TEXT, ECGLog TEXT, EEGLog TEXT, OxymeterLog TEXT, StrainLog TEXT, FlowLog TEXT, SnoreLog TEXT, dateCreated TEXT NOT NULL);',
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

export const insertUser = (title, ECGLog, EEGLog, OxymeterLog, StrainLog, FlowLog, SnoreLog, dateCreated) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO users (title, ECGLog, EEGLog, OxymeterLog, StrainLog, FlowLog, SnoreLog, dateCreated) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
                [title, ECGLog, EEGLog, OxymeterLog, StrainLog, FlowLog, SnoreLog, dateCreated],
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