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

interface RichTextEditorProps {
    value: string;
    onChange: (data: string) => void;
    label?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, label }) => {
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);
    }, []);

    if (!isLayoutReady) {
        return null;
    }

    return (
        <div className="rich-text-editor">
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-900" style={{ color: '#111827' }}>
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
                    color: #333 !important;
                }
                .ck-content h1, .ck-content h2, .ck-content h3, .ck-content h4, .ck-content h5, .ck-content h6 {
                    color: #111 !important;
                }
                .ck-content p {
                    color: #333 !important;
                }
                .ck.ck-editor__main > .ck-editor__editable {
                    background-color: white !important;
                }
                .ck.ck-toolbar {
                    background-color: #f3f4f6 !important;
                    border-color: #d1d5db !important;
                }
            `}</style>
        </div>
    );
};

export default RichTextEditor;
