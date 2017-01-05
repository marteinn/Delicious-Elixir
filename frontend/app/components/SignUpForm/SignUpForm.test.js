import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import SignUpForm from './';
import data from './SignUpForm.json';

describe('<SignUpForm />', () => {
    it('Renders an empty SignUpForm', () => {
        const wrapper = mount(<SignUpForm />);
        expect(wrapper.find(SignUpForm)).to.have.length(1);
    });

    it('Renders SignUpForm with data', () => {
        const wrapper = mount(<SignUpForm {...data} />);
        expect(wrapper.find(SignUpForm)).to.have.length(1);
    });
});
