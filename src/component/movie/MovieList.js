import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import { getMovieList } from '../../store/movieListReducer'
import MovieItem from './MovieItem'

class MovieList extends Component {

    componentDidMount() {
        this.props.getMovieList();
    }

    render() {

        const { list } = this.props;

        const items = list.map((doc) => {
            const id = doc.id;
            const data = doc.data();

            const { name, openedAt, director, description } = data;
            return <Grid.Column key={id} mobile={8} tablet={5} computer={4}>
                <MovieItem
                    name={name}
                    openedAt={openedAt}
                    director={director}
                    description={description}
                    likeCnt={0}
                />
            </Grid.Column>
        })

        return (
            <Grid>
                {items}
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.movieList.isLoading,
        list: state.movieList.list,
        error: state.movieList.error,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getMovieList: () => dispatch(getMovieList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);