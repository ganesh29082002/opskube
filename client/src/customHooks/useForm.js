import { useState } from 'react'

const useForm = (initialValues) => {

    const [formData, setFormData] = useState(initialValues)
    const [previewImg, setPriviewImg] = useState(null)

    const onChangeHandler = (e) => {
        const { name, value, type, checked, files } = e.target

        if (type === "file") {
            setFormData({ ...formData, [name]: files[0] })
            setPriviewImg(URL.createObjectURL(files[0]))
        } else if (type === "checked") {
            setFormData({ ...formData, [name]: checked })
        }
        else if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked })

        }
        else {
            setFormData({ ...formData, [name]: value })
        }
    }
    console.log(formData)

    const resetForm = () => {
        setFormData(initialValues)
    }
    return {
        formData, previewImg, onChangeHandler, resetForm
    }
}

export default useForm