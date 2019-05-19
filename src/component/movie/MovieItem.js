import React, { Component } from 'react'
import { Card, Icon } from 'semantic-ui-react'

class MovieItem extends Component {

    static defaultProps = {
        imageUrl: '',
        name: '',
        openedAt: '',
        description: '',
        likeCnt: 0,
    }

    render() {

        const {
            imageUrl,
            name,
            openedAt,
            description,
            likeCnt,
        } = this.props;
        // 'url('+imageUrl+')'
        // `url(${imageUrl})`
        return (
            <Card fluid>
                <div style={{
                    height:300,
                    backgroundImage:`url(${imageUrl})`,
                    backgroundPosition:'center',
                    backgroundSize:'cover',
                    backgroundRepeat:'no-repeat'
                }}/>
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{openedAt}</span>
                    </Card.Meta>
                    <Card.Description>
                        {description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='like' />
                        {likeCnt}
                    </a>
                </Card.Content>
            </Card>
        )
    }
}

export default MovieItem;