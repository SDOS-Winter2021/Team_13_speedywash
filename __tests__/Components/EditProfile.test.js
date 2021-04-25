import React from 'react';
import renderer from 'react-test-renderer';
import EditProfile from "../../Components/Profile/EditProfile"
import {test_user} from "../global"

it('EditProfile renders correctly', () => {
    const tree = renderer.create(<EditProfile currentUser={test_user} />).toJSON();
    expect(tree).toMatchSnapshot();
})