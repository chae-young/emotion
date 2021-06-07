import PropTypes from 'prop-types';
import Head from 'next/head';
import GlobalStyle from '../styles/GlobalStyle';
import wrapper from '../store/configureStore' 
import withReduxSaga from 'next-redux-saga';

const App = ({Component})=>{
    return(
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>?? COMMUNITY</title>
            </Head>
            <GlobalStyle/>
            <Component/>
        </>
    )
}

App.propTypes ={
    Component:PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(withReduxSaga(App));