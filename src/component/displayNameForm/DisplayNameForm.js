import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateDisplayName, displayNameValidationFailed } from '../../store/displayNameReducer'

import { Button, Form, Message } from 'semantic-ui-react'

class DisplayNameForm extends Component {
    state = {
        displayName: '',
    }

    onHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onUpdateDisplayName = (e) => {
        const {
            displayName,
        } = this.state;

        if (!displayName) {
            this.props.displayNameValidationFailed(new Error('Enter display name.'))
            return;
        }

        this.props.updateDisplayName(displayName);
    }

    render() {
        const { displayName } = this.state;
        const { isLoading, error } = this.props;

        return (
            <Form>
                <Form.Field>
                    <label>닉네임</label>
                    <input name="displayName" placeholder='닉네임' value={displayName} onChange={this.onHandleChange} />
                </Form.Field>

                <Button type='submit' loading={isLoading} onClick={this.onUpdateDisplayName}>닉네임 등록</Button>

                {error ? <Message content={error.message} /> : null}

            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.displayName.isLoading,
        error: state.displayName.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        displayNameValidationFailed: (error) => dispatch(displayNameValidationFailed(error)),
        updateDisplayName: (displayName) => dispatch(updateDisplayName(displayName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayNameForm);