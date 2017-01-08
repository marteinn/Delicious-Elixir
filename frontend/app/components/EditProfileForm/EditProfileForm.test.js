import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { EditProfileForm } from './EditProfileForm';
import data from './EditProfileForm.json';

describe('<EditProfileForm />', () => {
    it('Renders an empty EditProfileForm', () => {
        const wrapper = mount(<EditProfileForm />);
        expect(wrapper.find(EditProfileForm)).to.have.length(1);
    });

    it('Renders EditProfileForm with data', () => {
        const wrapper = mount(<EditProfileForm {...data} />);
        expect(wrapper.find(EditProfileForm)).to.have.length(1);
    });
});
