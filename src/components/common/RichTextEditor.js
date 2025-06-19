// RichTextEditor.js
import React, { useState } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';

// Import Froala Editor CSS files
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
          'insertImage', 'insertLink', 'insertTable', 'insertVideo', '|',
          'html', 'fullscreen', 'undo', 'redo'
        ],
        imageUpload: true,
        imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
        heightMin: 200,
      }}
    />
  );
};

export default RichTextEditor;
