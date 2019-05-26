import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Form, Message } from 'semantic-ui-react'
import MovieForm from './MovieForm'

class UpdateMovie extends Component {

    render() {
        const { error, isLoading } = this.props;

        return (
            <Form>
                <Grid>
                    <MovieForm ref="form" />
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
    }
}

const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMovie);