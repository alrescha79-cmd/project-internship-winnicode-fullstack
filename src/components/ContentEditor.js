import React, { useEffect } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const ContentEditor = ({ content, setContent }) => {
    useEffect(() => {
        const quill = new Quill('#editor', {
            theme: 'snow',
            placeholder: 'Silakan isi berita yang ingin diposting',
            modules: {
                toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' },
                    { 'indent': '-1' }, { 'indent': '+1' }],
                    ['link', 'image', 'video'],
                    ['clean']
                ],
            },
        })

        quill.on('text-change', () => {
            setContent(quill.root.innerHTML)
        })
    }, [setContent])

    return (
        <div>
            <label htmlFor="editor">Isi Berita</label>
            <div id="editor" style={{ height: '200px' }}></div>
        </div>
    )
}

export default ContentEditor