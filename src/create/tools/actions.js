import { push } from 'connected-react-router'

export const create = (data) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            const currentUser = await getFirebase().auth().currentUser

            const page = await getFirestore()
                .collection('pages')
                .add({ authorId: currentUser.uid, title: data.title, content: '' })

            dispatch(push('/pages/' + page.id))

        } catch (error) {
            console.log(error)   
        }
    }
}
