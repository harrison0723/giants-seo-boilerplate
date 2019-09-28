import React from 'react'
import { useTextInput } from '../../common/tools/input'
import { Input, Button, Alert } from 'antd'

export default function LoginForm(props) {

    const { login, loading, error } = props

    const email = useTextInput('')
    const password = useTextInput('')

    const submit = (e) => {
        e.preventDefault()
        login({ 
            email: email.value, 
            password: password.value 
        })
    }

    return (
        <form onSubmit={submit}>
            {error && <Alert className="error" type="warning" message={error} />}
            <Input
                {...email}
                name="email"
                type="email"
                placeholder="Email"
            />
            <Input
                {...password}
                name="password"
                type="password"
                placeholder="Password"
            />
            <Button
                loading={loading}
                htmlType="submit"
                className="form-button"
                type="primary">
                Login
            </Button>
        </form>
    )
}