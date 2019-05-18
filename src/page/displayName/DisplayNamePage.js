import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import DisplayNameForm from '../../component/displayNameForm/DisplayNameForm'

class DisplayNamePage extends Component {

    render() {
        return (<Grid centered>
            <Grid.Column mobile={15} tablet={6} computer={6}>
                <DisplayNameForm />
            </Grid.Column>
        </Grid>)
    }
}

export default DisplayNamePage