import React from 'react'
import { useTextInput } from '../../common/tools/hooks'
import { Input, Button, Alert } from 'antd'

export default function SignupForm({ signup, loading, error }) {
    
    const name = useTextInput('')
    const email = useTextInput('')
    const password = useTextInput('')

    const submit = () => signup({ 
        name: name.value, 
        email: email.value, 
        password: password.value 
    })

    return (
        <div>
            {error && <Alert className="error" type="warning" message={error} />}
            <Input
                {...name}
                type="name"
                placeholder="Name"
            />
            <Input
                {...email}
                type="email"
                placeholder="Email"
            />
            <Input
                {...password}
                type="password"
                placeholder="Password"
            />
            <Button 
                onClick={() => submit()}
                loading={loading}
                className="form-button" 
                type="primary">
                Sign Up
            </Button>
        </div>
    )
}