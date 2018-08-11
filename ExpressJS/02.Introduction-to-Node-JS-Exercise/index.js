const storage = require('./storage')
const storageWithPromise = require('./storageWithPromises')

storage.put('first', 'some value')
storage.put('second', true)
storage.put('third', 1)

let someValue = storage.get('first')
console.log(someValue)

storage.update('first', 'edited value')

let anotherValue = storage.get('first')
console.log(anotherValue)

storage.delete('first')

storage.save(() => {
    storage.clear()

    storage.load(() => {
        let afterLoadValue = storage.get('second')
        console.log(afterLoadValue)
    })
})

storageWithPromise.put('first', 'some value')
storageWithPromise.put('second', true)
storageWithPromise.put('third', 1)

storageWithPromise
    .save()
    .then(() => {
        storageWithPromise.clear()

        storageWithPromise
        .load()
        .then(() => {
            let afterLoadValue = storageWithPromise.get('second')
            console.log(afterLoadValue)
        })
        .catch(err => console.log(err))
    })