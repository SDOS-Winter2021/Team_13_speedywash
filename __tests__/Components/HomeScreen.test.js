import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from "../../Components/HomeScreen/HomeScreen"
import {test_user} from "../global"

it('HomeScreen renders correctly', () => {
    const tree = renderer.create(<HomeScreen currentUser={test_user} currentView={{screen: "HOMEPAGE"}} />).toJSON();
    expect(tree).toMatchSnapshot();
})