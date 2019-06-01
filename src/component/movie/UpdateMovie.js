import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Form, Message, Loader } from 'semantic-ui-react'
import MovieForm from './MovieForm'

class UpdateMovie extends Component {

    componentDidMount() {
        // id에 해당하는 영화 불러오기
        console.log(this.props.movieId)
    }

    render() {
        const { error, isLoading, doc } = this.props;

        if (doc) {
            const { name, imageURL, description, director } = doc.data();
            return (
                <Form>
                    <MovieForm ref="form" />
                    <Grid>
                        <Grid.Row centered>
                            <Grid.Column mobile={16} tablet={8} computer={8}>
                                {
                                    error ? <Message content={error.message} /> : null
                                }
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row centered>
                            <Grid.Column mobile={16} tablet={8} computer={8}>
                                <Form.Button loading={isLoading} fluid onClick={this.onAddMovie} > 수정 완료 </Form.Button>
                                <Form.Button loading={isLoading} fluid onClick={this.onAddMovie} > 돌아 가기 </Form.Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            )
        } else {
            return <Loader active style={{ margin: 16 }} />
        }


    }
}

const mapStateToProps = (state) => {
    return {
        doc: state.updateMovie.doc
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMovie);