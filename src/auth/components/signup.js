import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Button, Alert } from 'antd'

class SignUpForm extends Component {
    render() {
        const { signup, error, handleSubmit, submitting } = this.props
        
        return (
            <Form onSubmit={handleSubmit(signup)}>
                {error && <Alert className="error" type="warning" message={error} showIcon />}
                <Field
                    name="name"
                    type="name"
                    component={Input}
                    placeholder="Name"
                />
                <Field
                    name="email"
                    type="email"
                    component={Input}
                    placeholder="Email"
                />
                <Field
                    name="password"
                    type="password"
                    component={Input}
                    placeholder="Password"
                />
                <Button className="form-button" type="primary" loading={submitting} htmlType="submit">Sign Up</Button>
            </Form>
        )
    }
}

export default reduxForm({ form: 'signUpForm' })(SignUpForm)