import React from 'react';
import Prompt from '../../components/templates/prompt/Prompt';
import Register from './Register';

const action = ({ getState }) => {
    const state = getState();
    const { user: { isAuthenticated } } = state;

    if (isAuthenticated) {
        return { redirect: '/home' };
    }

    return {
        chunks: ['register'],
        title: 'Register',
        component: (
            <Prompt>
                <Register />
            </Prompt>
        ),
    };
};

export default action;
