import React from 'react';
import renderer from 'react-test-renderer';
import "../configs/firebase-init";

it("global test", ()=>{
    expect(1).toBe(1)
})

const test_user = {
    "creationTime": {
        "nanoseconds": 592000000,
        "seconds": 1617622705,
    },
    "displayName": "test",
    "email": "hardik18391@iiitd.ac.in",
    "home": "1589/2  South Extension I New Delhi 110003 South East Delhi Delhi India",
    "office": "Nanak Chand Basti  bagwan gali New Delhi 110003 South East Delhi Delhi India",
    "other": "",
    "phoneNumber": "+919958820305",
    "photoURL": "https://firebasestorage.googleapis.com/v0/b/speedywash-7d67a.appspot.com/o/profile%2FxD1ncicw8lbnZGk9sTxPH9yCEi13?alt=media&token=85833276-6e3d-4a86-bbab-1d18c643d48a",
    "uid": "xD1ncicw8lbnZGk9sTxPH9yCEi13",
}



export {test_user}