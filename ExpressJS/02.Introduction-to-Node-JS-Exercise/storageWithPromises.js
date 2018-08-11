const fs = require('fs')

const dataFile = 'storagePromise.dat'

let data = {}

let validateKeyAsString = (key) => {
    if (typeof(key) !== 'string') {
        throw new Error('Key must be a string')
    }
}

let validateKeyExists = (key) => {
    if (!data.hasOwnProperty(key)) {
        throw new Error('Key does not exists')
    }
}

let put = (key, value) => {
    validateKeyAsString(key)

    if (data.hasOwnProperty(key)) {
        throw new Error('Key already exists')
    }

    data[key] = value

    console.log(data)
}

let get = (key) => {
    validateKeyAsString(key)
    validateKeyExists(key)

    return data[key]
}

let update = (key, value) => {
    validateKeyAsString(key)
    validateKeyExists(key)

    data[key] = value;
}

let deleteItem = (key) => {
    validateKeyAsString(key)
    validateKeyExists(key)

    delete data[key]
}

let clear = () => {
    data = {}
}

let save = () => {
    return new Promise((resolve, reject) => {
        let dataAsString = JSON.stringify(data)
        fs.writeFile(dataFile, dataAsString, (err) => {
            if (err) {
                reject(err)
                return
            }
    
            resolve()
        }) 
    })       
}

let load = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(dataFile, 'utf8', (err, dataJson) => {
            if (err) {
                reject(err)
                return
            }
    
            data = JSON.parse(dataJson)
            resolve()
        })
    })
}



module.exports = {
    put: put,
    get: get,
    update: update,
    delete: deleteItem,
    clear: clear,
    save: save,
    load: load
}