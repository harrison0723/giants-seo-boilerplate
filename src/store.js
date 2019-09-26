import { createStore, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory, createMemoryHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import firebaseConfig from './firebase'
import thunk from 'redux-thunk'
import rootReducer from './reducer'

const isServer = !(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
)

const reactReduxFirebaseConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile: true,
    updateProfileOnLogin: false
}

export default (url = '/') => {
    const history = isServer
        ? createMemoryHistory({ initialEntries: [url] })
        : createBrowserHistory()

    const middlewares = [routerMiddleware(history), thunk.withExtraArgument({ getFirebase, getFirestore })]
    const middlewareEnhaner = applyMiddleware(...middlewares)

    const storeEnhancers = [middlewareEnhaner]

    const composedEnhancers = composeWithDevTools(
        ...storeEnhancers,
        reactReduxFirebase(firebaseConfig, reactReduxFirebaseConfig),
        reduxFirestore(firebaseConfig)
    )

    const initialState = !isServer ? window.__PRELOADED_STATE__ : {}
    if (!isServer) { delete window.__PRELOADED_STATE__ }

    const store = createStore(
        connectRouter(history)(rootReducer),
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
