import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import SignInForm from './';
import data from './SignInForm.json';

describe('<SignInForm />', () => {
    it('Renders an empty SignInForm', () => {
        const wrapper = mount(<SignInForm />);
        expect(wrapper.find(SignInForm)).to.have.length(1);
    });

    it('Renders SignInForm with data', () => {
        const wrapper = mount(<SignInForm {...data} />);
        expect(wrapper.find(SignInForm)).to.have.length(1);
    });
});
