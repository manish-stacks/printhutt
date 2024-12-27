import React, { useRef, useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's default styling

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [quill, setQuill] = useState<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quill) {
      const quillInstance = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Compose an epic...',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'], // Formatting options
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'], // Media options
            ['clean'], // Remove formatting
          ],
        },
      });

      quillInstance.on('text-change', () => {
        const html = quillInstance.root.innerHTML;
        onChange(html);
      });

      setQuill(quillInstance);
    }
  }, [quill, onChange]);

  useEffect(() => {
    if (quill && quill.root.innerHTML !== value) {
      quill.root.innerHTML = value;
    }
  }, [value, quill]);

  return <div ref={editorRef} style={{height:'200px'}}/>;
};

export default QuillEditor;
