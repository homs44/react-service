import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import AddMovie from '../../component/movie/AddMovie'

class AddMoviePage extends Component {

    render() {
        return (
            <Grid centered>
                <Grid.Column mobile={15} tablet={12} computer={10}>
                    <AddMovie />
                </Grid.Column>
            </Grid>
        )
    }
}

export default AddMoviePage;