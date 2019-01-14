import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { updateUser } from '../../actions/user';
import Field from '../../components/atoms/formik/Field';
import { SettingsValidation } from '../../validation/ValidationSchema';
import { NotificationContext } from '../../context';


class Settings extends Component {
    static propTypes = {
        user: PropTypes.shape({
            user: PropTypes.shape({
                firstname: PropTypes.string.isRequired,
                lastname: PropTypes.string.isRequired,
                email: PropTypes.string.isRequired,
            }),
        }).isRequired,
    }

    static contextType = NotificationContext;

    submit = async (values, { setSubmitting, setErrors }) => {
        const { user: { user: { id } }, updateUser: update } = this.props;

        if (values) {
            const response = await fetch(`/api/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const json = await response.json();

            if (response.status !== 200) {
                setSubmitting(false);
                setErrors({ [json.field]: json.message });
            } else {
                const { open } = this.context;
                update(values);
                open('User settings successfully updated.');
                setSubmitting(false);
            }
        }
    };

    render() {
        const { user: { user: { firstname, lastname, email } } } = this.props;

        return (
            <>
                <h1>User settings</h1>
                <Formik
                    initialValues={{
                        firstname,
                        lastname,
                        email,
                    }}
                    onSubmit={this.submit}
                    validationSchema={SettingsValidation}
                >
                    {({ dirty, isSubmitting }) => (
                        <>
                            <Form>
                                <Field name="firstname" label="First name" placeholder="First name" />
                                <Field name="lastname" label="Last name" placeholder="Last name" />
                                <Field name="email" label="E-mail" placeholder="E-mail" />
                                <button disabled={!dirty || isSubmitting} type="submit">Save</button>
                            </Form>
                        </>
                    )}
                </Formik>
            </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, { updateUser })(Settings);
