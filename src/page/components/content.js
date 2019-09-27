import React from 'react'
import { useTextInput } from '../../common/tools/hooks'
import { Input, Button } from 'antd'
const TextArea = Input.TextArea

export default function ContentForm({ update, loading }) {

    const content = useTextInput('')

    const submit = () => update({ content: content.value })

    return (
        <div>
            <TextArea
                {...content}
                type="text"
                placeholder="Content"
                autosize={{ minRows: 4 }}
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