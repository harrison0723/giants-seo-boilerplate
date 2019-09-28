import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory, createMemoryHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getFirebase } from 'react-redux-firebase'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import firebase from './firebase'
import thunk from 'redux-thunk'
import rootReducer from './reducer'
import { isServer } from './common/tools/check'

export default (url = '/') => {
    const history = isServer
        ? createMemoryHistory({ initialEntries: [url] })
        : createBrowserHistory()

    const middlewares = [routerMiddleware(history), thunk.withExtraArgument({ getFirebase, getFirestore })]
    const middlewareEnhaner = applyMiddleware(...middlewares)

    const storeEnhancers = [middlewareEnhaner]

    const composedEnhancers = composeWithDevTools(...storeEnhancers, reduxFirestore(firebase))

    const initialState = !isServer ? window.__PRELOADED_STATE__ : {}
    if (!isServer) { delete window.__PRELOADED_STATE__ }

    const store = createStore(
        rootReducer(history),
        initialState,
        composedEnhancers
    )

    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('./reducer', () => {
                store.replaceReducer(rootReducer)
            })
        }
    }

    return { store, history }
}
