import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';

import { SignInContainer } from './SignIn';

describe('SignIn form', () => {
    it('calls onSubmit function with corret arguments when a valid form is submitted', async () => {
        const onSubmit = jest.fn();
        const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

        fireEvent.changeText(getByTestId('usernameField'), 'mauno'); 
        fireEvent.changeText(getByTestId('passwordField'), 'secret');
        fireEvent.press(getByTestId('submitButton'));

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(onSubmit.mock.calls[0][0]).toEqual({
                username: 'mauno',
                password: 'secret'
            });
        });
    });
});