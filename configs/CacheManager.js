/**
 * @module
 */
import AsyncStorage from '@react-native-community/async-storage';
import keys from "../configs/KEYS"

/**
 * Promise object hence asynchronous
 * Returns null either when key is not present or cached value is expired the timeout
 * @param {string} key - mapping key corresponding to the item required
 * @returns {Promise} - A promise that contains reference to getter function
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

/**
 * Make sure key is unique
 * value must be an object
 * timeout in milliseconds
 * @param {string} key - key to which value must be mapped in cache, used in while calling getValue
 * @param {Object} value - Object to store in cache
 * @param {number} timeout - after this many milliseconds, this item will expire.
 * @returns {Promise} - A promise that contains reference to setter function
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

/**
 * 
 * @param {string} key - key to the corresponding item that is needed to be removed form cache 
 * @returns {Promise} - A promise that contains reference to removal of key function
 */
export function removeValue(key) {
    return AsyncStorage.removeItem(key);
}

/**
 * Removes all the values from cache that were stored, keys are fetched from keys.storage
 */
export function cleanCache()
{
    const values = Object.values(keys.storage)
    for(var i=0;i<values.length;i++)
    {
        removeValue(values[i])
    }
}