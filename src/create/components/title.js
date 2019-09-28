import React from 'react'
import { useTextInput } from '../../common/tools/input'
import { Input, Button, Alert } from 'antd'

export default function TitleForm(props) {

    const { authenticated, create, loading, error } = props

    const title = useTextInput('')

    const submit = (e) => {
        e.preventDefault()
        create({ title: title.value })
    }

    return (
        <div>
            {error && <Alert className="error" type="warning" message={error} />}
            <form onSubmit={submit}>
                <Input
                    {...title}
                    size="large"
                    type="text"
                    placeholder="Title"
                />
                <Button
                    disabled={!authenticated || !title.value}
                    loading={loading}
                    htmlType="submit"
                    className="form-button"
                    type="primary">
                    {authenticated ? 'Create' : 'Login to Create'}
                </Button>
            </form>
        </div>
    )
}