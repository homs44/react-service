import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

import LoginForm from '../../component/login/LoginForm'

class LoginPage extends Component {

    render() {
        return (
            <Grid>
                <Grid.Row centered>
                    <Grid.Column mobile={15} tablet={8} computer={6}>
                        <LoginForm />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default LoginPage