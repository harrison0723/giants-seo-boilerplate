import React from 'react'
import { Modal, Button } from 'antd'
const confirm = Modal.confirm

function showConfirm(remove) {
    confirm({
        title: 'Do you want to delete this page?',
        content: 'This action cannot be undone.',
        okText: 'Delete',
        okType: 'danger',
        onOk() { return remove() },
        onCancel() { },
    })
}

const RemoveButton = ({ remove }) => {
    return (
        <Button 
            onClick={() => showConfirm(remove)} 
            className="remove-button" 
            type="danger" 
            block>
            Delete
        </Button>
    )
}

export default RemoveButton