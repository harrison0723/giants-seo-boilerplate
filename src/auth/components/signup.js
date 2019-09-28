import React from 'react'
import { useTextInput } from '../../common/tools/input'
import { Input, Button, Alert } from 'antd'

export default function SignupForm(props) {
    
    const { signup, loading, error } = props

    const name = useTextInput('')
    const email = useTextInput('')
    const password = useTextInput('')

    const submit = (e) => {
        e.preventDefault()
        signup({ 
            name: name.value, 
            email: email.value, 
            password: password.value 
        })
    }

    return (
        <form onSubmit={submit}>
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
                loading={loading}
                htmlType="submit"
                className="form-button" 
                type="primary">
                Sign Up
            </Button>
        </form>
    )
}