import './page.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { frontloadConnect } from 'react-frontload'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import Helmet from 'react-helmet'
import { update, remove } from './actions'
import ContentForm from './components/content'
import RemoveButton from './components/remove'
import NotFound from '../common/components/404'
import Spinner from '../common/components/spinner'

export class Page extends Component {
    render() {
        const { page, requested, match, update, remove } = this.props
        const pageId = match.params.pageId
        const requestedPage = requested[`pages/${pageId}`]

        if (requestedPage && isLoaded(page)) return (
            <div>
                <Helmet>
                    <title>{page.title}</title>
                    <meta name="description" content={page.content} />
                </Helmet>
                <div className="ssr page">
                    <h1>{page.title}</h1>
                    <p>{page.content}</p>
                    <ContentForm update={(data) => update(data, pageId)} />
                    <RemoveButton remove={() => remove(pageId)} />
                </div>
            </div>
        )
        else if (requestedPage && !isLoaded(page)) return <NotFound />
        else return <Spinner size="big" />
    }
}

const mapState = state => ({
    page: state.firestore.data.page,
    requested: state.firestore.status.requested
})

const actions = { update, remove }

const query = props => [{
    collection: 'pages',
    doc: props.match.params.pageId,
    storeAs: 'page'
}]

const frontload = async props => {
    await props.firestore.get({
        collection: 'pages',
        doc: props.match.params.pageId,
        storeAs: 'page'
    })
}

const options = { onMount: true, onUpdate: false }

export default connect(mapState, actions)(firestoreConnect(query)(frontloadConnect(frontload, options)(Page)))
