import React, { Component } from 'react'
import MovieList from '../../component/movie/MovieList'
import ReactGA from 'react-ga'
import { withRouter } from 'react-router-dom'

class HomePage extends Component {

    componentDidMount() {
        ReactGA.pageview(this.props.location.pathname + this.props.location.search)
    }
    render() {
        return (
            <div>
                <MovieList />
            </div>
        )
    }
}

export default withRouter(HomePage)