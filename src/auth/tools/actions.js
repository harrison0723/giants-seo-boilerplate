import { push } from 'connected-react-router'
import { actionTypes } from 'redux-firestore'
import { loadUser, loadedUser, authError } from './reducer'
import { SystemError } from '../../common/tools/error'

export const login = (creds) => {
    return async (dispatch, getState, { getFirebase }) => {
        try {
            dispatch(loadUser())

            await getFirebase()
                .auth()
                .setPersistence('local')

            await getFirebase()
                .auth()
                .signInWithEmailAndPassword(creds.email, creds.password)
            
            dispatch(push('/create'))

            dispatch(loadedUser())
        } catch (error) {
            dispatch(authError(error.message))
        }
    }
}

export const signup = (creds) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            dispatch(loadUser())

            // Create the user in Firebase
            await getFirebase()
                .auth()
                .createUserWithEmailAndPassword(creds.email, creds.password)
            
            const currentUser = await getFirebase().auth().currentUser

            currentUser.updateProfile({ displayName: creds.name })

            // Create the user in Firestore
            await getFirestore()
                .collection('users')
                .doc(currentUser.uid)
                .set({
                    name: creds.name,
                    email: creds.email,
                    createdAt: getFirestore().FieldValue.serverTimestamp()
                })

            dispatch(push('/create'))

            dispatch(loadedUser())
        } catch (error) {
            dispatch(authError(error.message))
        }
    }
}

export const signout = () => {
    return async (dispatch, getState, { getFirebase }) => {
        try {
            await getFirebase().auth().signOut()
            dispatch({ type: actionTypes.CLEAR_DATA })
            dispatch(push('/'))
        } catch (error) {
            SystemError(error)
        }
    }
}