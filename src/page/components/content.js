import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Button, Alert } from 'antd'

class ContentForm extends Component {
    render() {
        const { update, error, handleSubmit, submitting, pristine } = this.props

        return (
            <Form onSubmit={handleSubmit(update)}>
                {error && <Alert className="error" type="warning" message={error} />}
                <Field
                    name="content"
                    type="text"
                    component={Input}
                    placeholder="Content"
                    autoComplete="off"
                    autosize={{ minRows: 4 }}
                />
                <Button className="form-button" type="primary" disabled={pristine} loading={submitting} htmlType="submit">Update</Button>
            </Form>
        )
    }
}

export default reduxForm({ form: 'contentForm' })(ContentForm)