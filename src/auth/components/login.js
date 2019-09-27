import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Button, Alert } from 'antd'

class LoginForm extends Component {
    render() {
        const { login, error, handleSubmit, submitting } = this.props
        
        return (
            <Form onSubmit={handleSubmit(login)}>
                {error && <Alert className="error" type="warning" message={error} showIcon />}
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
                <Button className="form-button" type="primary" loading={submitting} htmlType="submit">Login</Button>
            </Form>
        )
    }
}

export default reduxForm({ form: 'loginForm' })(LoginForm)