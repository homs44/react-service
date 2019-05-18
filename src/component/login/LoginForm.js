import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, loginValidationFailed } from '../../store/loginReducer'

import { Button, Form, Message } from 'semantic-ui-react'

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
    }

    onHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onLogin = (e) => {
        /**
         * 이메일 입력했는지?
         * 비밀번호 입력했는지?
         */
        const {
            email,
            password,
        } = this.state;

        if (!email) {
            this.props.loginValidationFailed(new Error('Enter email.'))
            return;
        }

        if (!password) {
            this.props.loginValidationFailed(new Error('Enter password'))
            return;
        }

        this.props.login(email, password);
    }

    render() {
        const { email, password } = this.state;
        const { isLoading, error } = this.props;

        return (
            <Form>
                <Form.Field>
                    <label>이메일</label>
                    <input name="email" placeholder='이메일' value={email} onChange={this.onHandleChange} />
                </Form.Field>
                <Form.Field>
                    <label>비밀번호</label>
                    <input name="password" type="password" placeholder='비밀번호' value={password} onChange={this.onHandleChange} />
                </Form.Field>

                <Button type='submit' loading={isLoading} onClick={this.onLogin}>로그인</Button>

                {error ? <Message content={error.message} /> : null}

            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.login.isLoading,
        error: state.login.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password)),
        loginValidationFailed: (error) => dispatch(loginValidationFailed(error))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);