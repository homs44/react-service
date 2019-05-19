import React, { Component } from 'react'
import { Grid, Form } from 'semantic-ui-react'

class MovieForm extends Component {

    state = {
        name: '',
        director: '',
        openedAt: '',
        description: '',
    }

    onHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onAddMovie = () => {
        const { name, director, openedAt, description } = this.state;

        // 유효성 검사

        //추가
    }

    render() {
        const { name, director, openedAt, description } = this.state;
        return (
            <Form>
                <Grid>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={8} computer={8}>

                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Form.Input name="name" label="영화 제목" placeholder="영화 제목" value={name} onChange={this.onHandleChange} />
                            <Form.Input name="director" label="감독" placeholder="감독" value={director} onChange={this.onHandleChange} />
                            <Form.Input name="openedAt" label="개봉일" placeholder="개봉일" value={openedAt} onChange={this.onHandleChange} />
                            <Form.TextArea name="description" label="설명" placeholder="설명" value={description} onChange={this.onHandleChange} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Form.Button onClick={this.onAddMovie} > 영화 등록 </Form.Button>
                    </Grid.Row>
                </Grid>
            </Form>
        )
    }
}

export default MovieForm;