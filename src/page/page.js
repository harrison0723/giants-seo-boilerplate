import './page.css'
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { frontloadConnect } from 'react-frontload'
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Helmet from 'react-helmet'
import { update, remove } from './tools/actions'
import ContentForm from './components/content'
import RemoveButton from './components/remove'
import NotFound from '../common/components/404'
import Spinner from '../common/components/spinner'

class Page extends Component {
    render() {
        const { page, match, update, remove } = this.props
        const pageId = match.params.pageId

        if (isLoaded(page) && page) return (
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
        else if (isLoaded(page) && isEmpty(page)) return <NotFound />
        else return <Spinner size="big" />
    }
}

const mapState = state => ({
    page: state.firestore.data.page
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

const composed = compose(
    connect(mapState, actions), 
    firestoreConnect(query), 
    frontloadConnect(frontload, options)
)

export default composed(Page)