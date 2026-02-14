
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Strikethrough,
  Underline as UnderlineIcon,
  Highlighter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import './RichTextEditor.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MenuButton = ({
  onClick,
  isActive = false,
  disabled = false,
  children,
  title
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`w-9 h-9 p-0 rounded-lg transition-all ${isActive
      ? 'bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary'
      : 'text-gray-500 hover:bg-gray-100'
      }`}
  >
    {children}
  </Button>
);

export default function RichTextEditor({ value, onChange, placeholder = 'Start writing...' }: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-2xl max-w-full h-auto my-8 border border-gray-100 shadow-lg',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log('📝 Editor Update:', html.length > 100 ? html.substring(0, 100) + '...' : html);
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'min-h-[400px] focus:outline-none p-8 text-gray-700 leading-relaxed font-sans',
      },
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update editor content ONLY IF it's drastically different or on initial load
  // and NOT when the editor currently has focus (to avoid cursor jumps and loops)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      if (!editor.isFocused) {
        editor.commands.setContent(value, { emitUpdate: false });
      }
    }
  }, [value, editor]);

  if (!isMounted || !editor) {
    return (
      <div className="h-[500px] w-full bg-gray-50/50 animate-pulse rounded-[2rem] border border-dashed border-gray-200 flex items-center justify-center">
        <span className="text-gray-400 font-medium tracking-wide italic">Initialising editor...</span>
      </div>
    );
  }

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // Insert or wrap with link
    if (editor.state.selection.empty) {
      editor.chain().focus().insertContent(`<a href="${url}">${url}</a>`).run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const addImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch('/api/blog/upload', {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();

          if (data.location) {
            console.log('✅ Image uploaded successfully:', data.location);
            // Use insertContent for more reliable insertion
            editor.chain().focus().insertContent({
              type: 'image',
              attrs: {
                src: data.location,
              },
            }).run();
          } else {
            console.error('❌ Upload failed:', data.error);
            alert(`Upload failed: ${data.error}`);
          }
        } catch (error) {
          console.error('❌ Network error during upload:', error);
          alert('Failed to upload image. Check your connection.');
        }
      }
    };
    input.click();
  };

  return (
    <div className="w-full border border-gray-100 rounded-[2rem] overflow-hidden bg-white shadow-sm ring-1 ring-gray-200/50">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50/80 border-b border-gray-100 backdrop-blur-sm sticky top-0 z-10 sticky-toolbar">
        <div className="flex items-center gap-1 px-2 border-r border-gray-200 mr-1">
          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo size={18} />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-gray-200 mr-1">
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            <Heading1 size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <Heading2 size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            title="Heading 3"
          >
            <Heading3 size={18} />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-gray-200 mr-1">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold"
          >
            <Bold size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic"
          >
            <Italic size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Underline"
          >
            <UnderlineIcon size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            isActive={editor.isActive('highlight')}
            title="Highlight"
          >
            <Highlighter size={18} />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-gray-200 mr-1">
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            title="Align Left"
          >
            <AlignLeft size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            title="Align Center"
          >
            <AlignCenter size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            title="Align Right"
          >
            <AlignRight size={18} />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 px-2 border-r border-gray-200 mr-1">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Ordered List"
          >
            <ListOrdered size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Blockquote"
          >
            <Quote size={18} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
            title="Code Block"
          >
            <Code size={18} />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 px-2">
          <MenuButton onClick={addLink} isActive={editor.isActive('link')} title="Insert Link">
            <LinkIcon size={18} />
          </MenuButton>
          <MenuButton onClick={addImage} title="Insert Image">
            <ImageIcon size={18} />
          </MenuButton>
        </div>
      </div>

      {/* Editor Content */}
      <div className="editor-container bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
