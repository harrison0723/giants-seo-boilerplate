import React from 'react'
import { Modal, Button } from 'antd'
import styles from './remove.module.css'

const confirm = (remove) => {
    Modal.confirm({
        title: 'Do you want to delete this page?',
        content: 'This action cannot be undone.',
        okText: 'Delete',
        okType: 'danger',
        onOk() { return remove() },
        onCancel() { },
    })
}

export default function RemoveButton ({ remove }) {
    return (
        <Button 
            onClick={() => confirm(remove)} 
            className={styles.removeButton}
            type="danger" 
            block>
            Delete
        </Button>
    )
}