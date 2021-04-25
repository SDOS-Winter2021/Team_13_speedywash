import React from 'react';
import renderer from 'react-test-renderer';
import Header from "../../Components/Header/Header"
import {test_user} from "../global"

it('Header renders correctly', () => {
    const tree = renderer.create(<Header currentView={{screen: "HOMEPAGE"}} />).toJSON();
    expect(tree).toMatchSnapshot();
})

