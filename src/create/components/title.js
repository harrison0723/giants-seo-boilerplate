import React from 'react'
import { useTextInput } from '../../common/tools/hooks'
import { Input, Button, Alert } from 'antd'

export default function TitleForm({ authenticated, create, loading, error }) {

    const title = useTextInput('')

    const submit = () => create({ title: title.value })

    return (
        <div>
            {error && <Alert className="error" type="warning" message={error} />}
            <Input
                {...title}
                size="large"
                type="text"
                placeholder="Title"
            />
            <Button
                onClick={() => submit()}
                disabled={!authenticated || !title.value}
                loading={loading}
                className="form-button"
                type="primary">
                {authenticated ? 'Create' : 'Login to Create'}
            </Button>
        </div>
    )
}