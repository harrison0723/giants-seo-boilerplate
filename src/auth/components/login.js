import React from 'react'
import { useTextInput } from '../../common/tools/input'
import { Input, Button, Alert } from 'antd'

export default function LoginForm({ login, loading, error }) {
    
    const email = useTextInput('')
    const password = useTextInput('')

    const submit = () => login({ 
        email: email.value, 
        password: password.value 
    })

    return (
        <div>
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
                onClick={() => submit()}
                loading={loading}
                className="form-button" 
                type="primary">
                Login
            </Button>
        </div>
    )
}