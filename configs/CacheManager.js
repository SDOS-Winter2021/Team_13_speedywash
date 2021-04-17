import AsyncStorage from '@react-native-community/async-storage';
import keys from "../configs/KEYS"

/*
    Promise object hence asynchronous
    Returns null either when key is not present or cached value is expired the timeout
*/
export function getValue(key) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key).then((value) => {
            if (value == null)
                resolve(null);
            
            value = JSON.parse(value)
            
            
            if (value.timeout < (new Date()).getTime())
                resolve(null);
            else
                resolve(value.data);
        }).catch((message) => {
            reject(message)
        })
    })
}

/*
    * Make sure key is unique
    * value must be an object
    * timeout in milliseconds
*/
export function setValue(key, value, timeout) {
    const creationTime = (new Date()).getTime()
    const expiryTime = creationTime + timeout
    const newObj = {
        data: value,
        timeout: expiryTime
    }
    return AsyncStorage.setItem(key, JSON.stringify(newObj))
}

export function removeValue(key) {
    return AsyncStorage.removeItem(key);
}

export function cleanCache()
{
    const values = Object.values(keys.storage)
    for(var i=0;i<values.length;i++)
    {
        removeValue(values[i])
    }
}