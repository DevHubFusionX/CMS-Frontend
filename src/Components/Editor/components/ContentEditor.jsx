import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import '../TipTapEditor.css';

const ContentEditor = ({ value, onChange, error }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      console.log('TipTap HTML output:', htmlContent);
      onChange(htmlContent);
    }
  });

  // Update editor content when value changes (for AI-generated content)
  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div>
      <label className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
        Content
      </label>
      <div className="prose-editor-container border rounded-lg overflow-hidden" style={{borderColor: 'var(--color-base-300)'}}>
        {/* Toolbar */}
        <div className="flex flex-wrap gap-1 p-3 border-b" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
          {[
            { action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold'), label: 'Bold' },
            { action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic'), label: 'Italic' },
            { action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }), label: 'H1' },
            { action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }), label: 'H2' },
            { action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList'), label: 'List' },
            { action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote'), label: 'Quote' }
          ].map((btn, index) => (
            <button
              key={index}
              type="button"
              onClick={btn.action}
              className="px-3 py-1 rounded text-sm font-medium transition-colors"
              style={{
                backgroundColor: btn.active ? 'var(--color-primary)' : 'var(--color-base-100)',
                color: btn.active ? 'var(--color-primary-content)' : 'var(--color-base-content)'
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
        
        {/* Editor */}
        <EditorContent 
          editor={editor} 
          className="prose dark:prose-invert max-w-none p-4 min-h-96 max-h-96 overflow-y-auto focus:outline-none"
          style={{backgroundColor: 'var(--color-base-100)', color: 'var(--color-base-content)'}}
        />
        
        <div className="p-2 text-xs opacity-70" style={{color: 'var(--color-base-content)', backgroundColor: 'var(--color-base-100)'}}>
          💡 Tip: Use the AI assistant above to generate content, then edit with the rich text editor
        </div>
      </div>
      {error && (
        <p className="text-xs mt-1" style={{color: 'var(--color-error)'}}>{error}</p>
      )}
    </div>
  );
};

export default ContentEditor;