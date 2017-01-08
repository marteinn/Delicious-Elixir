import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import ChangePasswordForm from './';
import data from './ChangePasswordForm.json';

describe('<ChangePasswordForm />', () => {
    it('Renders an empty ChangePasswordForm', () => {
        const wrapper = mount(<ChangePasswordForm />);
        expect(wrapper.find(ChangePasswordForm)).to.have.length(1);
    });

    it('Renders ChangePasswordForm with data', () => {
        const wrapper = mount(<ChangePasswordForm {...data} />);
        expect(wrapper.find(ChangePasswordForm)).to.have.length(1);
    });
});
