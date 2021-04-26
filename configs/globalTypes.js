/**
 * @module globaltypes
 */

/**
 * A user
 * @typedef module:globaltypes.User
 * @type {Object}
 * @property {Date} creationTime - Account creation time
 * @property {string} displayName - user display name
 * @property {string} email - user email
 * @property {string} home - home address
 * @property {string} office - office address
 * @property {string} other - other address
 * @property {string} phoneNumber - user's contact number
 * @property {string} uid - unique user identifier
*/

/**
 * Currently Selected and visible screen object
 * @typedef module:globaltypes.VisibleView
 * @type {Object}
 * @property {string} screen - Currently Visible screen-name, currently selected screen
 * @property {boolean} header - header visibility
 * @property {boolean} footer - footer visibility
*/

/**
 * A location object (fetched from gps)
 * @typedef module:globaltypes.Location
 * @type {Object}
 * @property {string} name - Current location name
 * @property {string} street - Current location street
 * @property {string} district - Current location district
 * @property {string} city - Current location city
 * @property {string} postalCode - Current location postal-code
 * @property {string} subregion - Current location sub-region
 * @property {string} region - Current location region
 * @property {string} country - Current location country
 *
*/

/**
 * An order object
 * @typedef module:globaltypes.Order
 * @type {Object}
 * @property {string} uid - current user's uid
 * @property {string} displayName - current user's displayName,
 * @property {string} phoneNumber - current user's phoneNumber,
 * @property {Object} orderItems - ordered items,
 * @property {string} pickUpAddress - pickup address,
 * @property {Date} pickUpDate - scheduled pickup date,
 * @property {string} pickUpTimeSlot - scheduled pickup time slot,
 * @property {Date} orderTime - order placing time,
 * @property {string} orderTimeString - order placing time string,
 * @property {string} addressLabel - selected slot address,
 * @property {Number} totalAmount - order amount,
 * @property {Number} pickUpTimeSlotStart - pickup time slot starting,
 * @property {Number} pickUpTimeSlotEnd - pickup time slot ending,
 * @property {Object} orderStatus - orderstatus object,
 * @property {string} oid - order id hash of concatenated uid and orderTimeString
*/

/**
 * Global Property Object
 * @typedef module:globaltypes.Keys
 * @type {Object}
 * @property {Object} storage - contains mapping of keys to string that are used in local cache
 * @property {Object} screens - contains mapping of keys to string that are used in screen names
 * @property {Object} colors - contains mapping of keys to color string that are used in application
 * @property {Object} orderStatus - contains mapping of keys to Object that are used while placing order
 * @property {Object} time - contains time in milliseconds
 */