import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Button } from 'semantic-ui-react'
import { getMovieList } from '../../store/movieListReducer'
import MovieItem from './MovieItem'

class MovieList extends Component {

    componentDidMount() {
        this.props.getMovieList(null);
    }

    onLoadMore = () => {
        if (this.props.list.length) {
            this.props.getMovieList(this.props.list[this.props.list.length - 1]);
        } else {
            this.props.getMovieList(null);
        }
    }

    render() {
        const { list } = this.props;

        const items = list.map((doc) => {
            const id = doc.id;
            const data = doc.data();

            const { name, openedAt, director, description, imageURL } = data;
            return <Grid.Column key={id} mobile={8} tablet={4} computer={4}>
                <MovieItem
                    name={name}
                    imageUrl={imageURL}
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

                <Grid.Row centered>
                    <Button onClick={this.onLoadMore}>더 불러오기</Button>
                </Grid.Row>
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
        getMovieList: (last) => dispatch(getMovieList(last))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);