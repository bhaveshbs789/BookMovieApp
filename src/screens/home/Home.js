import React from 'react';
import Header from '../../common/header/Header';

export default function Home(props) {
    return (
        <React.Fragment>
                <Header baseUrl={props.baseUrl}></Header>
        </React.Fragment>
    )
}