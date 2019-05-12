import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../../store/loginReducer'

import { Button, Form, Message } from 'semantic-ui-react'

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        message: ''
    }

    static getDerivedStateFromProps = (props) => {
        const { error } = props;

        if (error) {
            return {
                message: error.message
            }
        } else {
            if(!this.state){
                return null;
            }

            const { message } = this.state;

            return {
                message: message,
            }
        }

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
            this.setState({
                message: '이메일을 입력하세요'
            })
            return;
        }

        if (!password) {
            this.setState({
                message: '비밀번호를 입력하세요'
            })
            return;
        }

        this.setState({
            message: ''
        })

        this.props.login(email, password);
    }

    render() {
        console.log(this.state);
        console.log(this.props);
        const { email, password, message } = this.state;
        const { isLoading } = this.props;

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

                {message ? <Message content={message} /> : null}

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
        login: (email, password) => dispatch(login(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);