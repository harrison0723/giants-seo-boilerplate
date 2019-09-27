import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Button, Alert } from 'antd'

class TitleForm extends Component {
    render() {
        const { create, authenticated, error, handleSubmit, submitting, pristine } = this.props

        return (
            <Form onSubmit={handleSubmit(create)}>
                {error && <Alert className="error" type="warning" message={error} />}
                <Field
                    size="large"
                    name="title"
                    type="text"
                    component={Input}
                    placeholder="Title"
                    autoComplete="off"
                />
                <Button className="form-button" type="primary" disabled={!authenticated || pristine} loading={submitting} htmlType="submit">
                    {authenticated ? 'Create' : 'Login to Create'}
                </Button>
            </Form>
        )
    }
}

export default reduxForm({ form: 'titleForm' })(TitleForm)