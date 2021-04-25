import React from 'react';
import renderer from 'react-test-renderer';
import Footer from "../../Components/Footer/Footer"
import {test_user} from "../global"

it('Footer renders correctly', () => {
    const tree = renderer.create(<Footer currentView={{screen: "HOMEPAGE"}} />).toJSON();
    expect(tree).toMatchSnapshot();
})

