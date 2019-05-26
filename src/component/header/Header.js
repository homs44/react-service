import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

import { logout } from '../../store/logoutReducer'

class Header extends Component {

    onLogout = () => {
        this.props.logout();
    }

    render() {

        const { user } = this.props;

        if (user) {
            return (
                <Menu>
                    <Menu.Item header>
                        게시판
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/">영화 목록</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/movie/add">영화 추가</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/my-movies">내가 등록한 영화</Link>
                    </Menu.Item>

                    <Menu.Menu position="right">
                        <Menu.Item>
                            {user.displayName}
                        </Menu.Item>
                        <Menu.Item>
                            <Button onClick={this.onLogout}>로그아웃</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            )
        } else {
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
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);