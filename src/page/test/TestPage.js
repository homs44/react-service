import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import MovieItem from '../../component/movie/MovieItem'
class TestPage extends Component {

    render() {
        return <Grid>
            <Grid.Column mobile={8} tablet={4} computer={4}>
                <MovieItem
                    imageUrl={"https://t3.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/30m2/image/LEBP0hU7_Ffc9ia04W1ys2gp-HA"}
                    name="마더"
                    opendAt="2019.01.01"
                    description="엄마와 아들의 이야기"
                    likeCnt={10}
                />
            </Grid.Column>
            <Grid.Column mobile={8} tablet={4} computer={4}>
                <MovieItem
                    imageUrl={"https://cdn.indiepost.co.kr/uploads/images/2016/07/EelKdXmA-1768x1262.jpeg"}
                    name="마더"
                    opendAt="2019.01.01"
                    description="엄마와 아들의 이야기"
                    likeCnt={10}
                />
            </Grid.Column>

            <Grid.Column mobile={8} tablet={4} computer={4}>
                <MovieItem
                    imageUrl={"https://t3.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/30m2/image/LEBP0hU7_Ffc9ia04W1ys2gp-HA"}
                    name="마더"
                    opendAt="2019.01.01"
                    description="엄마와 아들의 이야기"
                    likeCnt={10}
                />
            </Grid.Column>
            <Grid.Column mobile={8} tablet={4} computer={4}>
                <MovieItem
                    imageUrl={"https://image.fmkorea.com/files/attach/new/20180316/486616/909995987/981357030/3ec5f45a2f3dbf571d80cd02a7dad0b1.jpg"}
                    name="마더"
                    opendAt="2019.01.01"
                    description="엄마와 아들의 이야기"
                    likeCnt={10}
                />
            </Grid.Column>
            <Grid.Column mobile={8} tablet={4} computer={4}>
                <MovieItem
                    imageUrl={"https://t3.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/30m2/image/LEBP0hU7_Ffc9ia04W1ys2gp-HA"}
                    name="마더"
                    opendAt="2019.01.01"
                    description="엄마와 아들의 이야기"
                    likeCnt={10}
                />
            </Grid.Column>
        </Grid >
    }
}

export default TestPage;