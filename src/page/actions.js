import { SubmissionError, reset } from 'redux-form'
import { SystemError } from '../common/tools/error'
import { push } from 'connected-react-router'

export const update = (data, pageId) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            const currentUser = await getFirebase().auth().currentUser
            const page = await getFirestore()
                .collection('pages')
                .doc(pageId)
            page.get().then(function (doc) {
                if (doc.data().authorId !== currentUser.uid) return
                else page.update({ content: data.content })
            })
            dispatch(reset('contentForm'))
        } catch (error) {
            throw new SubmissionError({ _error: error.message })
        }
    }
}

export const remove = (pageId) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            const currentUser = await getFirebase().auth().currentUser
            dispatch(push('/create'))
            const page = getFirestore()
                .collection('pages')
                .doc(pageId)
            page.get().then(function (doc) {
                if (doc.data().authorId !== currentUser.uid) return
                else page.delete()
            })
        } catch (error) {
            SystemError(error)
        }
    }
}

export const loadPage = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        
    }
}