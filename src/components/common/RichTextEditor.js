// RichTextEditor.js
import React, { useState } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';

// Froala Editor CSS
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';

const RichTextEditor = ({ value, onChange }) => {
  const [content, setContent] = useState(value || '');

  return (
    <FroalaEditor
      tag='textarea'
      model={content}
      onModelChange={(newContent) => {
        setContent(newContent);
        onChange && onChange(newContent);
      }}
      config={{
        placeholderText: 'Write your blog content here...',
        charCounterCount: true,
        toolbarButtons: [
          'bold', 'italic', 'underline', 'strikeThrough', '|',
          'formatOL', 'formatUL', 'outdent', 'indent', '|',
          'insertLink', 'insertTable', '|',
          'html', 'fullscreen', 'undo', 'redo'
        ],
        quickInsertEnabled: false, 
        imageUpload: true,
        imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
        imageUploadURL: `${process.env.REACT_APP_BASE_URL}/api/blogs/upload-froala-image`,
        imageUploadParam: 'file',
        requestWithCORS: true,
        imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'],
        imageUploadMethod: 'POST',
        heightMin: 200,
      }}
    />
  );
};

export default RichTextEditor;
