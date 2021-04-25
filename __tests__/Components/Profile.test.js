import React from 'react';
import renderer from 'react-test-renderer';
import Profile from "../../Components/Profile/Profile"
import {test_user} from "../global"

it('Profile renders correctly', () => {
    const tree = renderer.create(<Profile currentUser={test_user} />).toJSON();
    expect(tree).toMatchSnapshot();
})

