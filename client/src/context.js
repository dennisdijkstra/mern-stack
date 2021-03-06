import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const NotificationContext = React.createContext();

export class NotificationProvider extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    }

    state = {
        isOpen: false,
        message: '',
    };

    open = (message) => {
        this.setState({
            message,
            isOpen: true,
        });
        setTimeout(() => this.close(), 5000);
    };

    close = () => {
        this.setState({
            message: '',
            isOpen: false,
        });
    };

    render() {
        const { children } = this.props;
        const { isOpen, message } = this.state;

        return (
            <NotificationContext.Provider
                value={{
                    open: this.open,
                    close: this.close,
                    isOpen,
                    message,
                }}
            >
                {children}
            </NotificationContext.Provider>
        );
    }
}
