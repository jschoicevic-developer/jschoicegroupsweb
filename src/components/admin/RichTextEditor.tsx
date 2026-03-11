'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { CharacterCount } from '@tiptap/extension-character-count';
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
  Highlighter,
  Type,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TEXT_COLORS = [
  { label: 'Default', value: '' },
  { label: 'Black', value: '#000000' },
  { label: 'Dark Gray', value: '#374151' },
  { label: 'Gray', value: '#6b7280' },
  { label: 'Red', value: '#ef4444' },
  { label: 'Orange', value: '#f97316' },
  { label: 'Amber', value: '#f59e0b' },
  { label: 'Green', value: '#22c55e' },
  { label: 'Teal', value: '#14b8a6' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Indigo', value: '#6366f1' },
  { label: 'Purple', value: '#a855f7' },
  { label: 'Pink', value: '#ec4899' },
  { label: 'Rose', value: '#f43f5e' },
];

const HIGHLIGHT_COLORS = [
  { label: 'Yellow', value: '#fef08a' },
  { label: 'Green', value: '#bbf7d0' },
  { label: 'Blue', value: '#bfdbfe' },
  { label: 'Pink', value: '#fbcfe8' },
  { label: 'Orange', value: '#fed7aa' },
  { label: 'Purple', value: '#e9d5ff' },
];

const MenuButton = ({
  onClick,
  isActive = false,
  disabled = false,
  children,
  title,
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
    className={cn(
      'w-9 h-9 p-0 rounded-lg transition-all',
      isActive
        ? 'bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary'
        : 'text-gray-500 hover:bg-gray-100'
    )}
  >
    {children}
  </Button>
);

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Start writing...',
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const colorRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-primary underline cursor-pointer' },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-2xl max-w-full h-auto my-8 border border-gray-100 shadow-lg',
        },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: true }),
      CharacterCount,
      Placeholder.configure({ placeholder }),
    ],
    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: cn(
          'min-h-[400px] focus:outline-none p-8 text-gray-700 leading-relaxed font-sans',
          '[&_h1]:text-4xl [&_h1]:font-black [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-gray-900',
          '[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-gray-800',
          '[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-gray-800',
          '[&_p]:my-4 [&_p]:leading-relaxed [&_p]:text-gray-600',
          '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul]:space-y-2',
          '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_ol]:space-y-2',
          '[&_li]:leading-7',
          '[&_blockquote]:border-l-4 [&_blockquote]:border-gray-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-gray-500',
          '[&_code]:bg-gray-100 [&_code]:rounded [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-red-500',
          '[&_pre]:bg-gray-900 [&_pre]:text-white [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:my-6 [&_pre]:overflow-x-auto',
          '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-white',
          '[&_a]:text-primary [&_a]:underline [&_a]:cursor-pointer',
          '[&_img]:rounded-2xl [&_img]:my-8 [&_img]:shadow-lg [&_img]:border [&_img]:border-gray-100',
          '[&_hr]:my-10 [&_hr]:border-t-2 [&_hr]:border-gray-100',
          '[&_strong]:font-bold [&_strong]:text-gray-900',
          '[&_p.is-editor-empty:first-child]:before:content-[attr(data-placeholder)] [&_p.is-editor-empty:first-child]:before:text-gray-300 [&_p.is-editor-empty:first-child]:before:float-left [&_p.is-editor-empty:first-child]:before:pointer-events-none [&_p.is-editor-empty:first-child]:before:h-0'
        ),
      },
    },
  });

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (editor && value !== editor.getHTML() && !editor.isFocused) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (colorRef.current && !colorRef.current.contains(e.target as Node))
        setShowColorPicker(false);
      if (highlightRef.current && !highlightRef.current.contains(e.target as Node))
        setShowHighlight(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!isMounted || !editor) {
    return (
      <div className="h-[500px] w-full bg-gray-50/50 animate-pulse rounded-[2rem] border border-dashed border-gray-200 flex items-center justify-center">
        <span className="text-gray-400 font-medium tracking-wide italic">Initialising editor...</span>
      </div>
    );
  }

  const addLink = () => {
    const prev = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL:', prev);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
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
      if (!file) return;
      const fd = new FormData();
      fd.append('file', file);
      try {
        const res = await fetch('/api/blog/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (data.location) {
          editor.chain().focus().insertContent({ type: 'image', attrs: { src: data.location } }).run();
        } else {
          alert(`Upload failed: ${data.error}`);
        }
      } catch {
        alert('Failed to upload image.');
      }
    };
    input.click();
  };

  const wordCount = editor.storage.characterCount?.words() ?? 0;
  const charCount = editor.storage.characterCount?.characters() ?? 0;
  const activeTextColor = editor.getAttributes('textStyle').color as string | undefined;

  return (
    <div className="w-full rounded-[2rem] bg-white shadow-sm ring-1 ring-gray-200/50 overflow-hidden flex flex-col">

      {/* ── Toolbar — sticky at top of editor ── */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-1 gap-y-2">

          {/* Undo / Redo */}
          <div className="flex items-center gap-1 pr-2 border-r border-gray-200">
            <MenuButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo"><Undo size={18} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo"><Redo size={18} /></MenuButton>
          </div>

          {/* Headings */}
          <div className="flex items-center gap-1 px-2 border-r border-gray-200">
            <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Heading 1"><Heading1 size={18} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Heading 2"><Heading2 size={18} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="Heading 3"><Heading3 size={18} /></MenuButton>
          </div>

          {/* Formatting */}
          <div className="flex items-center gap-1 px-2 border-r border-gray-200">
            <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold"><Bold size={18} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic"><Italic size={18} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline"><UnderlineIcon size={18} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strikethrough"><Strikethrough size={18} /></MenuButton>
          </div>

          {/* Text Color */}
          <div className="flex items-center gap-1 px-2 border-r border-gray-200">
            <div className="relative" ref={colorRef}>
              <button
                type="button"
                title="Text Color"
                onClick={() => { setShowColorPicker(v => !v); setShowHighlight(false); }}
                className={cn(
                  'w-9 h-9 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all hover:bg-gray-100',
                  showColorPicker && 'bg-primary/10'
                )}
              >
                <Type size={14} className="text-gray-600" />
                <span
                  className="block h-1 w-5 rounded-full"
                  style={{ backgroundColor: activeTextColor || '#374151' }}
                />
              </button>

              {showColorPicker && (
                <div className="absolute top-11 left-0 z-50 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 min-w-[200px]">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Text Color</p>
                  <div className="grid grid-cols-7 gap-1.5">
                    {TEXT_COLORS.map((c) => (
                      <button
                        key={c.label}
                        type="button"
                        title={c.label}
                        onClick={() => {
                          c.value
                            ? editor.chain().focus().setColor(c.value).run()
                            : editor.chain().focus().unsetColor().run();
                          setShowColorPicker(false);
                        }}
                        className={cn(
                          'w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none',
                          (activeTextColor ?? '') === c.value ? 'border-primary' : 'border-gray-200'
                        )}
                        style={{ backgroundColor: c.value || '#ffffff' }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={highlightRef}>
              <button
                type="button"
                title="Highlight Color"
                onClick={() => { setShowHighlight(v => !v); setShowColorPicker(false); }}
                className={cn(
                  'w-9 h-9 rounded-lg flex flex-col items-center justify-center gap-0.5 transition-all hover:bg-gray-100',
                  showHighlight && 'bg-primary/10'
                )}
              >
                <Highlighter size={14} className="text-gray-600" />
                <span
                  className="block h-1 w-5 rounded-full"
                  style={{ backgroundColor: editor.getAttributes('highlight').color || '#fef08a' }}
                />
              </button>

              {showHighlight && (
                <div className="absolute top-11 left-0 z-50 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 min-w-[180px]">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Highlight</p>
                  <div className="grid grid-cols-7 gap-1.5">
                    {HIGHLIGHT_COLORS.map((c) => (
                      <button
                        key={c.label}
                        type="button"
                        title={c.label}
                        onClick={() => {
                          editor.chain().focus().toggleHighlight({ color: c.value }).run();
                          setShowHighlight(false);
                        }}
                        className={cn(
                          'w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none',
                          editor.isActive('highlight', { color: c.value }) ? 'border-primary' : 'border-gray-200'
                        )}
                        style={{ backgroundColor: c.value }}
                      />
                    ))}
                    <button
                      type="button"
                      title="Remove highlight"
                      onClick={() => { editor.chain().focus().unsetHighlight().run(); setShowHighlight(false); }}
                      className="w-6 h-6 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:border-red-300 hover:text-red-400 transition-colors text-[10px] font-bold"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-1 px-2 border-r border-gray-200">
            <MenuButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Align Left"><AlignLeft size={18} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Align Center"><AlignCenter size={18} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Align Right"><AlignRight size={18} /></MenuButton>
          </div>

          {/* Lists & Blocks */}
          <div className="flex items-center gap-1 px-2 border-r border-gray-200">
            <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List"><List size={18} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Ordered List"><ListOrdered size={18} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Blockquote"><Quote size={18} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} title="Code Block"><Code size={18} /></MenuButton>
          </div>

          {/* Link & Image */}
          <div className="flex items-center gap-1 px-2">
            <MenuButton onClick={addLink} isActive={editor.isActive('link')} title="Insert Link"><LinkIcon size={18} /></MenuButton>
            <MenuButton onClick={addImage} title="Insert Image"><ImageIcon size={18} /></MenuButton>
          </div>

          {/* Word & Char Count */}
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl">
            <span className="text-xs text-gray-400 font-medium">
              <span className="text-gray-700 font-bold">{wordCount.toLocaleString()}</span> words
            </span>
            <span className="text-gray-200 text-xs">|</span>
            <span className="text-xs text-gray-400 font-medium">
              <span className="text-gray-700 font-bold">{charCount.toLocaleString()}</span> chars
            </span>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="editor-container bg-white flex-1">
        <EditorContent editor={editor} />
      </div>

    </div>
  );
}
