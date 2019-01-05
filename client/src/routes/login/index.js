import React from 'react';
import Prompt from '../../components/templates/prompt/Prompt';
import Login from './Login';

const action = ({ getState }) => {
    const state = getState();
    const { user: { isAuthenticated } } = state;

    if (isAuthenticated) {
        return { redirect: '/home' };
    }

    return {
        chunks: ['login'],
        title: 'Login',
        component: (
            <Prompt>
                <Login />
            </Prompt>
        ),
    };
};

export default action;
