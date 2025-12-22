'use client';

import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Bold,
    Essentials,
    Italic,
    Paragraph,
    Undo,
    List,
    Heading,
    Link,
    BlockQuote,
    Underline,
    Strikethrough,
    Code,
    Subscript,
    Superscript
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import { useTheme } from '../../contexts/ThemeContext';

interface RichTextEditorProps {
    value: string;
    onChange: (data: string) => void;
    label?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, label }) => {
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const { darkMode } = useTheme();

    useEffect(() => {
        setIsLayoutReady(true);
    }, []);

    if (!isLayoutReady) {
        return null;
    }

    return (
        <div className="rich-text-editor">
            {label && (
                <label className="block mb-2 text-sm font-medium" style={{ color: darkMode ? '#e5e7eb' : '#111827' }}>
                    {label}
                </label>
            )}
            <div className="prose max-w-none">
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        toolbar: {
                            items: [
                                'undo', 'redo',
                                '|',
                                'heading',
                                '|',
                                'bold', 'italic', 'underline', 'strikethrough', 'code', 'subscript', 'superscript',
                                '|',
                                'link', 'blockQuote',
                                '|',
                                'bulletedList', 'numberedList'
                            ]
                        },
                        plugins: [
                            Bold, Essentials, Italic, Paragraph, Undo, List, Heading, Link, BlockQuote,
                            Underline, Strikethrough, Code, Subscript, Superscript
                        ],
                        licenseKey: 'GPL'
                    }}
                    data={value}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        onChange(data);
                    }}
                />
            </div>
            <style jsx global>{`
                .ck-editor__editable_inline {
                    min-height: 300px;
                }
                .ck-content {
                    color: ${darkMode ? '#f5f5f5' : '#333'} !important;
                    background-color: ${darkMode ? '#1a1a1a' : 'white'} !important;
                }
                .ck-content h1, .ck-content h2, .ck-content h3, .ck-content h4, .ck-content h5, .ck-content h6 {
                    color: ${darkMode ? '#f5f5f5' : '#111'} !important;
                }
                .ck-content p {
                    color: ${darkMode ? '#f5f5f5' : '#333'} !important;
                }
                .ck.ck-editor__main > .ck-editor__editable {
                    background-color: ${darkMode ? '#1a1a1a' : 'white'} !important;
                    border-color: ${darkMode ? '#2a2a2a' : '#ccced1'} !important;
                }
                .ck.ck-toolbar {
                    background-color: ${darkMode ? '#0f0f0f' : '#f3f4f6'} !important;
                    border-color: ${darkMode ? '#2a2a2a' : '#d1d5db'} !important;
                }
                .ck.ck-button {
                    color: ${darkMode ? '#f5f5f5' : '#333'} !important;
                }
                .ck.ck-button:hover {
                    background-color: ${darkMode ? '#2a2a2a' : '#e5e7eb'} !important;
                }
                .ck.ck-button.ck-on {
                    background-color: ${darkMode ? '#2a2a2a' : '#dedede'} !important;
                    color: ${darkMode ? '#fff' : '#333'} !important;
                }
                .ck.ck-list {
                    background-color: ${darkMode ? '#1a1a1a' : 'white'} !important;
                    border-color: ${darkMode ? '#2a2a2a' : '#ccced1'} !important;
                }
                .ck.ck-list__item .ck-button {
                    color: ${darkMode ? '#f5f5f5' : '#333'} !important;
                }
                .ck.ck-list__item .ck-button:hover {
                    background-color: ${darkMode ? '#2a2a2a' : '#e5e7eb'} !important;
                }
            `}</style>
        </div>
    );
};

export default RichTextEditor;
