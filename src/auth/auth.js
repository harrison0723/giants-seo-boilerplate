import './auth.css'
import React, { Component } from "react"
import { connect } from 'react-redux'
import { login, signup } from './tools/actions'
import LoginForm from './components/login'
import SignUpForm from './components/signup'
import { Card, Tabs } from 'antd'
const TabPane = Tabs.TabPane

export class Auth extends Component {
    render() {
        return (
            <div className="auth">
                <Tabs>
                    <TabPane tab="Login" key="login">
                        <Card bordered={false}>
                            <LoginForm {...this.props} />
                        </Card>
                    </TabPane>
                    <TabPane tab="Sign Up" key="signup">
                        <Card bordered={false}>
                            <SignUpForm {...this.props} />
                        </Card>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapState = state => ({
    loading: state.auth.loading,
    error: state.auth.error
})

const actions = { login, signup }

export default connect(mapState, actions)(Auth)
