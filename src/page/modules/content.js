import React from 'react'
import { useTextInput } from '../../common/tools/input'
import { Input, Button } from 'antd'
import styles from './content.module.css'

export default function ContentForm(props) {

    const { update, loading } = props

    const content = useTextInput('')

    const submit = () => update({ content: content.value })

    return (
        <div>
            <Input.TextArea
                {...content}
                className={styles.textarea}
                autosize={{ minRows: 4 }}
                type="text"
                placeholder="Content"
            />
            <Button
                onClick={() => submit()} 
                loading={loading} 
                className="form-button"
                type="primary">
                Update
            </Button>
        </div>
    )
}