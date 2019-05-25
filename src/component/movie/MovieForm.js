import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Form, Message, Header, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { addMovieValidationFailed, addMovie, initAddMovieState } from '../../store/addMovieReducer'

class MovieForm extends Component {

    state = {
        name: '',
        director: '',
        openedAt: '',
        description: '',
        image: null,
    }

    componentDidMount() {
        this.props.initAddMovieState();
    }

    onHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onAddMovie = () => {
        const { name, director, openedAt, description, image } = this.state;

        // 유효성 검사
        if (!name) {
            this.props.addMovieValidationFailed(new Error('Enter name.'))
            return;
        }
        if (!director) {
            this.props.addMovieValidationFailed(new Error('Enter director.'))
            return;
        }
        if (!openedAt) {
            this.props.addMovieValidationFailed(new Error('Enter opendAt.'))
            return;
        }
        if (!description) {
            this.props.addMovieValidationFailed(new Error('Enter description.'))
            return;
        }

        const file = image ? image.file : null;
        //추가
        this.props.addMovie(name, director, openedAt, description, file);
    }

    onAddImage = () => {
        this.refs.image.click();
    }

    onImageChange = (e) => {
        if (!(e.target.files && e.target.files.length))
            return;

        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            this.setState({
                image: {
                    file: file,
                    src: reader.result,
                }
            })
        }

    }

    onImageDelete = () => {
        this.setState({
            image: null
        })
    }

    render() {
        const { name, director, openedAt, description, image } = this.state;
        const { error, isLoading, isSuccess } = this.props;

        if (isSuccess) {
            return (
                <Grid>
                    <Grid.Row centered>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Header>영화 등록 완료</Header>
                            <Link to="/">영화 목록으로</Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            );
        }

        return (
            <Form>
                <Grid>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <input ref="image" type="file" style={{ display: 'none' }} onChange={this.onImageChange} />
                            <Form.Button fluid onClick={this.onAddImage}>이미지 등록</Form.Button>
                            {image ?
                                <Image src={image.src} style={{ cursor: 'pointer' }} onClick={this.onImageDelete} /> :
                                null
                            }


                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Form.Input name="name" label="영화 제목" placeholder="영화 제목" value={name} onChange={this.onHandleChange} />
                            <Form.Input name="director" label="감독" placeholder="감독" value={director} onChange={this.onHandleChange} />
                            <Form.Input name="openedAt" label="개봉일" placeholder="개봉일" value={openedAt} onChange={this.onHandleChange} />
                            <Form.TextArea name="description" label="설명" placeholder="설명" value={description} onChange={this.onHandleChange} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row centered>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            {
                                error ? <Message content={error.message} /> : null
                            }
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row centered>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                            <Form.Button loading={isLoading} fluid onClick={this.onAddMovie} > 영화 등록 </Form.Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.addMovie.error,
        isLoading: state.addMovie.isLoading,
        isSuccess: state.addMovie.isSuccess,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addMovie: (name, director, openedAt, description, file) => dispatch(addMovie(name, director, openedAt, description, file)),
        addMovieValidationFailed: (error) => dispatch(addMovieValidationFailed(error)),
        initAddMovieState: () => dispatch(initAddMovieState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieForm);