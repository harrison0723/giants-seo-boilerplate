import React from 'react'
import { render, hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import Loadable from 'react-loadable'
import { Frontload } from 'react-frontload'
import { ConnectedRouter } from 'connected-react-router'
import createStore from './store'
import App from './app'

const { store, history } = createStore()

const Application = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Frontload noServerRender={true}>
                <App />
            </Frontload>
        </ConnectedRouter>
    </Provider>
)

const root = document.getElementById('root')

if (root.hasChildNodes() === true) { 
    Loadable.preloadReady().then(() => {
        hydrate(Application, root)
    })
} else {
    if (module.hot) {
        module.hot.accept('./app', () => {
            const NextApp = require('./app').default

            const NextApplication = (
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <Frontload noServerRender={true}>
                            <NextApp />
                        </Frontload>
                    </ConnectedRouter>
                </Provider>
            )
            render(NextApplication, root)
        })
    }
    store.firebaseAuthIsReady.then(() => {
        render(Application, root)
    })
}
