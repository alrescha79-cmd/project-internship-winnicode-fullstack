import React, { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import '../css/news/ContentEditor.css'

const ContentEditor = ({ value, onChange }) => {
    const editorRef = useRef(null)
    const quillRef = useRef(null)
    const initialContentSet = useRef(false)

    useEffect(() => {
        if (!quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
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

            quillRef.current.on('text-change', () => {
                onChange(quillRef.current.root.innerHTML)
            })
        }

        // Set initial content only once
        if (value && quillRef.current && !initialContentSet.current) {
            quillRef.current.clipboard.dangerouslyPasteHTML(value)
            initialContentSet.current = true
        }
    }, [onChange, value])

    return (
        <div>
            <label htmlFor="editor">Isi Berita</label>
            <div id="editor" ref={editorRef} style={{ height: '600px' }}></div>
        </div>
    )
}

export default ContentEditor