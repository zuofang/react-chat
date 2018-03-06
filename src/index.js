import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import reducers from './reducer'
import config from './config'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import './index.css'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

function Boss(){
    return <h2>boss</h2>
}

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute />
                <Route path='/boss' component={Boss} />
                <Route path='/bossinfo' component={BossInfo} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)