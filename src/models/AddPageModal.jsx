import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';

const AddPageModal = ({open, onClose}) => {

  const [pageName, setPageName] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-h-[200px] p-3',
      },
    },
  });

  const handleSave = () => {
    if (!editor) return;

    const html = editor.getHTML();
    const text = editor.getText();

    console.log('Page Name:', pageName);
    console.log('Content HTML:', html);
    console.log('Content Text:', text);

    setIsOpen(false);
  };

  const addImage = () => {
    const url = window.prompt('Enter Image URL');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = window.prompt('Enter URL');
    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().unsetLink().run();
      return;
    }
    editor?.chain().focus().setLink({ href: url, target: '_blank' }).run();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-[700px] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#4318FF] rounded-t-2xl">
          <h2 className="text-[18px] font-bold text-white">Page Name</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-6 space-y-5">
          {/* Page Name */}
          <div>
            <label className="block text-[13px] font-medium text-[#2B3674] mb-2">
              Enter Page Name
            </label>
            <input
              type="text"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              placeholder="Enter Page Name"
              className="w-full border border-[#E0E5F2] rounded-lg px-4 py-2.5 text-[13px] text-[#2B3674] placeholder:text-[#A3AED0] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20 focus:border-[#4318FF]"
            />
          </div>

          {/* Policies Editor */}
          <div>
            <label className="block text-[13px] font-medium text-[#2B3674] mb-2">
              Policies
            </label>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 bg-white rounded-t-lg border border-b-0 border-[#E0E5F2]">
              <button
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`px-2.5 py-1 rounded text-sm font-bold hover:bg-gray-100 ${editor?.isActive('bold') ? 'bg-gray-200' : ''}`}
                title="Bold"
              >
                B
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`px-2.5 py-1 rounded text-sm italic hover:bg-gray-100 ${editor?.isActive('italic') ? 'bg-gray-200' : ''}`}
                title="Italic"
              >
                I
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
                className={`px-2.5 py-1 rounded text-sm underline hover:bg-gray-100 ${editor?.isActive('underline') ? 'bg-gray-200' : ''}`}
                title="Underline"
              >
                U
              </button>
              
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              
              <button
                onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor?.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
                title="Align Left"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 3h12v2H2V3zm0 4h8v2H2V7zm0 4h12v2H2v-2z"/>
                </svg>
              </button>
              <button
                onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor?.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
                title="Align Center"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 3h12v2H2V3zm2 4h8v2H4V7zm-2 4h12v2H2v-2z"/>
                </svg>
              </button>
              <button
                onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor?.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
                title="Align Right"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 3h12v2H2V3zm4 4h8v2H6V7zm-4 4h12v2H2v-2z"/>
                </svg>
              </button>
              <button
                onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor?.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : ''}`}
                title="Justify"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 3h12v2H2V3zm0 4h12v2H2V7zm0 4h12v2H2v-2z"/>
                </svg>
              </button>
              
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              
              <button
                onClick={() => editor?.chain().focus().sinkListItem('listItem').run()}
                className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"
                disabled={!editor?.can().sinkListItem('listItem')}
                title="Increase Indent"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3 4v2h10V4H3zm2 4v2h8V8H5zm2 4v2h6v-2H7z"/>
                </svg>
              </button>
              <button
                onClick={() => editor?.chain().focus().liftListItem('listItem').run()}
                className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"
                disabled={!editor?.can().liftListItem('listItem')}
                title="Decrease Indent"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M7 4v2h6V4H7zM5 8v2h8V8H5zM3 12v2h10v-2H3z"/>
                </svg>
              </button>
              
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              
              <button
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor?.isActive('bulletList') ? 'bg-gray-200' : ''}`}
                title="Bullet List"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="3" cy="4" r="1.5"/>
                  <circle cx="3" cy="8" r="1.5"/>
                  <circle cx="3" cy="12" r="1.5"/>
                  <rect x="6" y="3" width="8" height="2" rx="1"/>
                  <rect x="6" y="7" width="8" height="2" rx="1"/>
                  <rect x="6" y="11" width="8" height="2" rx="1"/>
                </svg>
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                className={`p-1.5 rounded hover:bg-gray-100 ${editor?.isActive('orderedList') ? 'bg-gray-200' : ''}`}
                title="Numbered List"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <text x="1" y="5" fontSize="5" fontWeight="bold">1.</text>
                  <text x="1" y="9" fontSize="5" fontWeight="bold">2.</text>
                  <text x="1" y="13" fontSize="5" fontWeight="bold">3.</text>
                  <rect x="6" y="3" width="8" height="2" rx="1"/>
                  <rect x="6" y="7" width="8" height="2" rx="1"/>
                  <rect x="6" y="11" width="8" height="2" rx="1"/>
                </svg>
              </button>
              
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              
              <button 
                onClick={setLink} 
                className="p-1.5 rounded hover:bg-gray-100"
                title="Add Link"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/>
                </svg>
              </button>
              <button 
                onClick={addImage} 
                className="p-1.5 rounded hover:bg-gray-100"
                title="Add Image"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1.5 2.5A1.5 1.5 0 013 1h10a1.5 1.5 0 011.5 1.5v10a1.5 1.5 0 01-1.5 1.5H3a1.5 1.5 0 01-1.5-1.5v-10zM3 2a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h10a.5.5 0 00.5-.5v-10A.5.5 0 0013 2H3zm2 3.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM11.5 11l-2.5-3-2 2.5L5.5 9 3 12h8.5z"/>
                </svg>
              </button>
            </div>

            {/* Editor */}
            <div className="border border-[#E0E5F2] rounded-b-lg overflow-hidden bg-white">
              <EditorContent
                editor={editor}
                className="min-h-[200px] prose prose-sm max-w-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-2.5 border border-[#FF6B6B] text-[#FF6B6B] text-[13px] font-bold rounded-lg hover:bg-[#FF6B6B]/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-[#4318FF] text-white text-[13px] font-bold rounded-lg hover:bg-[#3311DD] transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPageModal;