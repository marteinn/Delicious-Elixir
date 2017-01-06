import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Settings from './';
import data from './Settings.json';

describe('<Settings />', () => {
    it('Renders an empty Settings', () => {
        const wrapper = mount(<Settings />);
        expect(wrapper.find(Settings)).to.have.length(1);
    });

    it('Renders Settings with data', () => {
        const wrapper = mount(<Settings {...data} />);
        expect(wrapper.find(Settings)).to.have.length(1);
    });
});
