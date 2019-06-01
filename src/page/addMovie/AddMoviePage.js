import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import AddMovie from '../../component/movie/AddMovie'
import ReactGA from 'react-ga'

class AddMoviePage extends Component {

    componentDidMount() {
        ReactGA.pageview(this.props.location.pathname + this.props.location.search)
    }
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

export default withRouter(AddMoviePage);