import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

import { logout } from '../../store/logoutReducer'

class Header extends Component {

    onLogout = ()=>{
        this.props.logout();
    }

    render() {
        return (
            <Menu>
                <Menu.Item header>
                    게시판
                </Menu.Item>
                <Menu.Item>
                    <Link to="/">홈</Link>
                </Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button onClick={this.onLogout}>로그아웃</Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/login">로그인</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/signup">
                            회원가입
                        </Link>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Header);