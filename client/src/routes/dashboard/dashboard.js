import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setCurrentUser from '../../actions/user';
import history from '../../history';
import s from './dashboard.css';


class Dashboard extends Component {
    static propTypes = {
        user: PropTypes.shape({
            user: PropTypes.shape({
                firstname: PropTypes.string,
                lastname: PropTypes.string,
            }),
        }).isRequired,
        setCurrentUser: PropTypes.func.isRequired,
    };

    logOut = () => {
        const { setCurrentUser: setUser } = this.props;

        localStorage.removeItem('jwtToken');
        setUser({});
        history.push('/');
    };

    render() {
        const { user: { user: { firstname, lastname } } } = this.props;

        return (
            <div className={s.dashboard}>
                <h1>Dashboard</h1>
                <p>You&#39;re Logged in as {firstname} {lastname}</p>
                <button type="button" onClick={this.logOut}>Logout</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, { setCurrentUser })(Dashboard);
