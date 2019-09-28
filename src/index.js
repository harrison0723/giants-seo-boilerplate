import React from 'react'
import { render, hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import Loadable from 'react-loadable'
import { Frontload } from 'react-frontload'
import { ConnectedRouter } from 'connected-react-router'
import firebase from './firebase'
import createStore from './store'
import App from './app'
import * as serviceWorker from './serviceWorker'

const { store, history } = createStore()

const reactReduxFirebaseProps = { 
    firebase, 
    config: { enableLogging: true  },
    dispatch: store.dispatch,
    createFirestoreInstance 
}

const Application = (
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
            <ConnectedRouter history={history}>
                <Frontload noServerRender={true}>
                    <App />
                </Frontload>
            </ConnectedRouter>
        </ReactReduxFirebaseProvider>
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
                    <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
                        <ConnectedRouter history={history}>
                            <Frontload noServerRender={true}>
                                <NextApp />
                            </Frontload>
                        </ConnectedRouter>
                    </ReactReduxFirebaseProvider>
                </Provider>
            )
            render(NextApplication, root)
        })
    } 
    render(Application, root)
}

serviceWorker.register()