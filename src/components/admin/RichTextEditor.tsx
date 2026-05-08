'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import { Node as TiptapNode, mergeAttributes } from '@tiptap/core';
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
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
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
  ExternalLink,
  Pencil,
  Trash2,
  Check,
  X,
  Eye,
  EyeOff,
  Table as TableIcon,
  Plus,
  Minus,
  Lightbulb,
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

/** Truncate a URL for display inside the bubble menu */
function truncateUrl(url: string, max = 50) {
  if (url.length <= max) return url;
  return url.slice(0, max) + '…';
}

/**
 * Pro Tip block — a stand-out callout the writer can drop anywhere in the article.
 * Stored in the saved HTML as `<div data-pro-tip class="pro-tip-callout">…</div>`,
 * styled via globals.css so the editor and the published blog page render identically.
 */
const ProTip = TiptapNode.create({
  name: 'proTip',
  group: 'block',
  content: 'inline*',
  defining: true,

  parseHTML() {
    return [
      { tag: 'div[data-pro-tip]' },
      { tag: 'div.pro-tip-callout' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-pro-tip': '',
        class: 'pro-tip-callout',
      }),
      0,
    ];
  },

  addCommands() {
    return {
      toggleProTip:
        () =>
        ({ commands }: { commands: any }) =>
          commands.toggleNode('proTip', 'paragraph'),
    } as any;
  },
});

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

  // ── Link management state ──────────────────────────────────────────────────
  /** Controls the inline link-input bar below the toolbar */
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkInputValue, setLinkInputValue] = useState('');
  const linkInputRef = useRef<HTMLInputElement>(null);

  /** Controls the "all links" panel */
  const [showLinkPanel, setShowLinkPanel] = useState(false);

  /** Highlights every link in the editor with a subtle background */
  const [highlightLinks, setHighlightLinks] = useState(false);

  /** Controls the table insert menu */
  const [showTableMenu, setShowTableMenu] = useState(false);
  const tableMenuRef = useRef<HTMLDivElement>(null);
  const [customRows, setCustomRows] = useState(3);
  const [customCols, setCustomCols] = useState(3);

  /** Bubble-menu edit mode */
  const [bubbleEditMode, setBubbleEditMode] = useState(false);
  const [bubbleEditUrl, setBubbleEditUrl] = useState('');
  const bubbleInputRef = useRef<HTMLInputElement>(null);
  // ──────────────────────────────────────────────────────────────────────────

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'rte-link' },
        // Allow relative internal URLs (e.g. /blog/post-slug) in addition to absolute URLs
        isAllowedUri: (url, ctx) => {
          if (!url) return false;
          // Allow relative paths and hash anchors
          if (url.startsWith('/') || url.startsWith('#') || url.startsWith('./') || url.startsWith('../')) return true;
          return ctx.defaultValidate(url);
        },
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
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      ProTip,
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
          '[&_a]:text-blue-600 [&_a]:font-semibold [&_a]:underline [&_a]:cursor-pointer [&_a]:bg-blue-50 [&_a]:rounded [&_a]:px-0.5',
          '[&_img]:rounded-2xl [&_img]:my-8 [&_img]:shadow-lg [&_img]:border [&_img]:border-gray-100',
          '[&_hr]:my-10 [&_hr]:border-t-2 [&_hr]:border-gray-100',
          '[&_strong]:font-bold [&_strong]:text-gray-900',
          '[&_table]:border-collapse [&_table]:w-full [&_table]:my-6',
          '[&_th]:bg-gray-100 [&_th]:text-gray-700 [&_th]:font-bold [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:border [&_th]:border-gray-300',
          '[&_td]:px-4 [&_td]:py-2.5 [&_td]:border [&_td]:border-gray-300 [&_td]:text-gray-700',
          '[&_.selectedCell]:bg-blue-50',
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
      if (tableMenuRef.current && !tableMenuRef.current.contains(e.target as Node))
        setShowTableMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Focus bubble input when entering edit mode
  useEffect(() => {
    if (bubbleEditMode) {
      setTimeout(() => bubbleInputRef.current?.focus(), 30);
    }
  }, [bubbleEditMode]);

  // Focus link input bar when opened
  useEffect(() => {
    if (showLinkInput) {
      setTimeout(() => linkInputRef.current?.focus(), 30);
    }
  }, [showLinkInput]);

  if (!isMounted || !editor) {
    return (
      <div className="h-[500px] w-full bg-gray-50/50 animate-pulse rounded-[2rem] border border-dashed border-gray-200 flex items-center justify-center">
        <span className="text-gray-400 font-medium tracking-wide italic">Initialising editor...</span>
      </div>
    );
  }

  // ── Link helpers ───────────────────────────────────────────────────────────

  /** Open the inline link-input bar, pre-filling existing href if cursor is on a link */
  const openLinkInput = () => {
    const prev = editor.getAttributes('link').href ?? '';
    setLinkInputValue(prev);
    setShowLinkInput(true);
    setShowLinkPanel(false);
  };

  /** Apply the URL from the inline input bar */
  const applyLinkInput = () => {
    const url = linkInputValue.trim();
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else if (editor.state.selection.empty) {
      editor.chain().focus().insertContent(`<a href="${url}">${url}</a>`).run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
    setShowLinkInput(false);
    setLinkInputValue('');
  };

  const cancelLinkInput = () => {
    setShowLinkInput(false);
    setLinkInputValue('');
    editor.chain().focus().run();
  };

  /** Walk the ProseMirror doc to collect every link node with its position */
  const getEditorLinks = (): { from: number; to: number; href: string; text: string }[] => {
    const links: { from: number; to: number; href: string; text: string }[] = [];
    editor.state.doc.descendants((node, pos) => {
      for (const mark of node.marks) {
        if (mark.type.name === 'link' && mark.attrs.href) {
          links.push({
            from: pos,
            to: pos + node.nodeSize,
            href: mark.attrs.href as string,
            text: node.textContent,
          });
        }
      }
    });
    return links;
  };

  /** Navigate to a link in the editor by selecting it */
  const navigateToLink = (from: number, to: number) => {
    editor.chain().focus().setTextSelection({ from, to }).run();
    // Scroll the selected node into view
    const view = editor.view;
    const coords = view.coordsAtPos(from);
    const editorDom = view.dom;
    const scrollParent = editorDom.closest('.editor-container') as HTMLElement | null;
    if (scrollParent) {
      scrollParent.scrollTo({ top: coords.top + scrollParent.scrollTop - 120, behavior: 'smooth' });
    }
  };

  // ── Bubble-menu helpers ────────────────────────────────────────────────────

  const applyBubbleEdit = () => {
    const url = bubbleEditUrl.trim();
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
    setBubbleEditMode(false);
  };

  const removeLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    setBubbleEditMode(false);
  };

  // ── Image upload ───────────────────────────────────────────────────────────

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

  // ── Derived values ─────────────────────────────────────────────────────────

  const wordCount = editor.storage.characterCount?.words() ?? 0;
  const charCount = editor.storage.characterCount?.characters() ?? 0;
  const activeTextColor = editor.getAttributes('textStyle').color as string | undefined;
  const editorLinks = showLinkPanel ? getEditorLinks() : [];

  return (
    <div className="w-full rounded-[2rem] bg-white shadow-sm ring-1 ring-gray-200/50 overflow-hidden flex flex-col min-h-[500px] max-h-[calc(100dvh-10rem)]">

      {/* ── Bubble Menu — shown when cursor is inside a link ── */}
      <BubbleMenu
        editor={editor}
        shouldShow={({ editor: e }) => e.isActive('link')}
      >
        <div className="flex items-center gap-1 bg-gray-900 text-white rounded-xl shadow-xl px-2 py-1.5 text-sm max-w-xs">
          {bubbleEditMode ? (
            <>
              <input
                ref={bubbleInputRef}
                value={bubbleEditUrl}
                onChange={e => setBubbleEditUrl(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') applyBubbleEdit();
                  if (e.key === 'Escape') setBubbleEditMode(false);
                }}
                className="bg-gray-800 text-white rounded-lg px-2 py-0.5 text-xs w-48 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="https://..."
              />
              <button
                type="button"
                title="Apply"
                onClick={applyBubbleEdit}
                className="p-1 rounded hover:bg-green-600 transition-colors text-green-400"
              >
                <Check size={14} />
              </button>
              <button
                type="button"
                title="Cancel"
                onClick={() => setBubbleEditMode(false)}
                className="p-1 rounded hover:bg-gray-700 transition-colors text-gray-400"
              >
                <X size={14} />
              </button>
            </>
          ) : (
            <>
              <LinkIcon size={13} className="text-blue-400 shrink-0" />
              <span
                className="text-gray-300 text-xs truncate max-w-[160px]"
                title={editor.getAttributes('link').href}
              >
                {truncateUrl(editor.getAttributes('link').href ?? '')}
              </span>
              <div className="flex items-center gap-0.5 ml-1">
                <button
                  type="button"
                  title="Open link"
                  onClick={() => window.open(editor.getAttributes('link').href, '_blank')}
                  className="p-1 rounded hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
                >
                  <ExternalLink size={13} />
                </button>
                <button
                  type="button"
                  title="Edit link"
                  onClick={() => {
                    setBubbleEditUrl(editor.getAttributes('link').href ?? '');
                    setBubbleEditMode(true);
                  }}
                  className="p-1 rounded hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
                >
                  <Pencil size={13} />
                </button>
                <button
                  type="button"
                  title="Remove link"
                  onClick={removeLink}
                  className="p-1 rounded hover:bg-red-600 transition-colors text-gray-400 hover:text-white"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </>
          )}
        </div>
      </BubbleMenu>

      {/* ── Toolbar — fixed at top of editor's internal scroll ── */}
      <div className="shrink-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-3">
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

          {/* Pro Tip — stand-out callout block */}
          <div className="flex items-center gap-1 px-2 border-r border-gray-200">
            <button
              type="button"
              title="Pro Tip — insert a highlighted callout"
              onClick={() => (editor.chain().focus() as any).toggleProTip().run()}
              className={cn(
                'flex items-center gap-1.5 px-2.5 h-9 rounded-lg text-xs font-bold transition-all',
                editor.isActive('proTip')
                  ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                  : 'text-amber-600 hover:bg-amber-50'
              )}
            >
              <Lightbulb size={15} />
              <span>Pro Tip</span>
            </button>
          </div>

          {/* Link & Image */}
          <div className="flex items-center gap-1 px-2 border-r border-gray-200">
            <MenuButton
              onClick={openLinkInput}
              isActive={editor.isActive('link') || showLinkInput}
              title="Insert / Edit Link"
            >
              <LinkIcon size={18} />
            </MenuButton>
            <MenuButton onClick={addImage} title="Insert Image"><ImageIcon size={18} /></MenuButton>
          </div>

          {/* Table */}
          <div className="flex items-center gap-1 px-2 border-r border-gray-200">
            <div className="relative" ref={tableMenuRef}>
              <button
                type="button"
                title="Table options"
                onClick={() => setShowTableMenu(v => !v)}
                className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:bg-gray-100',
                  (showTableMenu || editor.isActive('table')) && 'bg-primary/10 text-primary'
                )}
              >
                <TableIcon size={18} className={editor.isActive('table') ? 'text-primary' : 'text-gray-500'} />
              </button>

              {showTableMenu && (
                <div className="absolute top-11 left-0 z-50 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 min-w-[220px]">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Insert Table</p>

                  {/* Quick presets */}
                  <div className="space-y-1 mb-3">
                    {[
                      { label: '2 × 2', rows: 2, cols: 2 },
                      { label: '3 × 3', rows: 3, cols: 3 },
                      { label: '3 × 4', rows: 3, cols: 4 },
                      { label: '4 × 4', rows: 4, cols: 4 },
                      { label: '5 × 5', rows: 5, cols: 5 },
                    ].map(({ label, rows, cols }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => {
                          editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
                          setShowTableMenu(false);
                        }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {label} table
                      </button>
                    ))}
                  </div>

                  {/* Custom size */}
                  <div className="border-t border-gray-100 pt-3 mb-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Custom Size</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex flex-col gap-0.5 flex-1">
                        <label className="text-[10px] text-gray-400">Rows</label>
                        <input
                          type="number"
                          min={1}
                          max={20}
                          value={customRows}
                          onChange={e => setCustomRows(Math.max(1, Math.min(20, Number(e.target.value))))}
                          className="w-full border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary/40"
                        />
                      </div>
                      <span className="text-gray-400 mt-4">×</span>
                      <div className="flex flex-col gap-0.5 flex-1">
                        <label className="text-[10px] text-gray-400">Columns</label>
                        <input
                          type="number"
                          min={1}
                          max={10}
                          value={customCols}
                          onChange={e => setCustomCols(Math.max(1, Math.min(10, Number(e.target.value))))}
                          className="w-full border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary/40"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        editor.chain().focus().insertTable({ rows: customRows, cols: customCols, withHeaderRow: true }).run();
                        setShowTableMenu(false);
                      }}
                      className="w-full px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      Insert {customRows} × {customCols} table
                    </button>
                  </div>

                  {/* Edit table (shown when cursor is inside a table) */}
                  {editor.isActive('table') && (
                    <div className="border-t border-gray-100 pt-3 mt-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Edit Table</p>
                      <div className="space-y-1">
                        <button type="button" onClick={() => { editor.chain().focus().addColumnBefore().run(); setShowTableMenu(false); }} className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"><Plus size={12} /> Add column before</button>
                        <button type="button" onClick={() => { editor.chain().focus().addColumnAfter().run(); setShowTableMenu(false); }} className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"><Plus size={12} /> Add column after</button>
                        <button type="button" onClick={() => { editor.chain().focus().addRowBefore().run(); setShowTableMenu(false); }} className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"><Plus size={12} /> Add row before</button>
                        <button type="button" onClick={() => { editor.chain().focus().addRowAfter().run(); setShowTableMenu(false); }} className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"><Plus size={12} /> Add row after</button>
                        <button type="button" onClick={() => { editor.chain().focus().deleteColumn().run(); setShowTableMenu(false); }} className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"><Minus size={12} /> Delete column</button>
                        <button type="button" onClick={() => { editor.chain().focus().deleteRow().run(); setShowTableMenu(false); }} className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"><Minus size={12} /> Delete row</button>
                        <button type="button" onClick={() => { editor.chain().focus().deleteTable().run(); setShowTableMenu(false); }} className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center gap-2"><Trash2 size={12} /> Delete table</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Link tools: view all links + highlight toggle */}
          <div className="flex items-center gap-1 px-2 border-r border-gray-200">
            <button
              type="button"
              title={showLinkPanel ? 'Hide links panel' : 'Show all links'}
              onClick={() => { setShowLinkPanel(v => !v); setShowLinkInput(false); }}
              className={cn(
                'flex items-center gap-1.5 px-2.5 h-9 rounded-lg text-xs font-medium transition-all',
                showLinkPanel
                  ? 'bg-primary/10 text-primary hover:bg-primary/20'
                  : 'text-gray-500 hover:bg-gray-100'
              )}
            >
              <LinkIcon size={14} />
              <span>Links</span>
            </button>
            <button
              type="button"
              title={highlightLinks ? 'Turn off link highlights' : 'Highlight all links'}
              onClick={() => setHighlightLinks(v => !v)}
              className={cn(
                'w-9 h-9 p-0 rounded-lg flex items-center justify-center transition-all',
                highlightLinks
                  ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                  : 'text-gray-500 hover:bg-gray-100'
              )}
            >
              {highlightLinks ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
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

      {/* ── Inline Link Input Bar ── */}
      {showLinkInput && (
        <div className="shrink-0 border-b border-gray-100 bg-blue-50/60 px-4 py-2.5 flex items-center gap-2">
          <LinkIcon size={15} className="text-blue-500 shrink-0" />
          <input
            ref={linkInputRef}
            type="url"
            value={linkInputValue}
            onChange={e => setLinkInputValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') applyLinkInput();
              if (e.key === 'Escape') cancelLinkInput();
            }}
            placeholder="https://example.com"
            className="flex-1 bg-white border border-blue-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          <button
            type="button"
            onClick={applyLinkInput}
            className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Check size={14} />
            Apply
          </button>
          <button
            type="button"
            onClick={cancelLinkInput}
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            <X size={14} />
            Cancel
          </button>
        </div>
      )}

      {/* ── Links Panel ── */}
      {showLinkPanel && (
        <div className="shrink-0 border-b border-gray-100 bg-gray-50/70">
          <div className="px-4 py-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Links in document
              {editorLinks.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold">
                  {editorLinks.length}
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={() => setShowLinkPanel(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
          {editorLinks.length === 0 ? (
            <p className="px-4 pb-3 text-xs text-gray-400 italic">No links found in the content.</p>
          ) : (
            <ul className="px-4 pb-3 space-y-1 max-h-48 overflow-y-auto">
              {editorLinks.map((link, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 group rounded-lg px-2 py-1.5 hover:bg-white hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => navigateToLink(link.from, link.to)}
                  title="Click to navigate to this link"
                >
                  <LinkIcon size={12} className="text-blue-400 shrink-0" />
                  <span className="text-xs text-gray-700 font-medium truncate min-w-0 max-w-[120px]">
                    {link.text || '(no text)'}
                  </span>
                  <span className="text-[11px] text-gray-400 truncate flex-1 min-w-0">
                    {link.href}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button
                      type="button"
                      title="Open in new tab"
                      onClick={e => { e.stopPropagation(); window.open(link.href, '_blank'); }}
                      className="p-0.5 rounded text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <ExternalLink size={11} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ── Editor Content (scrolls independently while toolbar stays fixed) ── */}
      <div
        className={cn(
          'editor-container bg-white flex-1 min-h-0 overflow-y-auto overscroll-contain',
          highlightLinks && 'links-highlighted'
        )}
      >
        <style>{`
          .rte-link {
            color: #2563eb;
            font-weight: 600;
            text-decoration: underline;
            background-color: #eff6ff;
            border-radius: 3px;
            padding: 1px 3px;
            cursor: pointer;
          }
          .links-highlighted .rte-link {
            background-color: #dbeafe;
            outline: 1px solid #93c5fd;
          }
          .ProseMirror table {
            border-collapse: collapse;
            table-layout: fixed;
            width: 100%;
            margin: 1.5rem 0;
            overflow: hidden;
          }
          .ProseMirror td, .ProseMirror th {
            min-width: 1em;
            border: 1px solid #d1d5db;
            padding: 8px 12px;
            vertical-align: top;
            box-sizing: border-box;
            position: relative;
          }
          .ProseMirror th {
            background-color: #f3f4f6;
            font-weight: bold;
            text-align: left;
          }
          .ProseMirror .selectedCell:after {
            z-index: 2;
            position: absolute;
            content: '';
            left: 0; right: 0; top: 0; bottom: 0;
            background: rgba(59, 130, 246, 0.1);
            pointer-events: none;
          }
          .ProseMirror .column-resize-handle {
            position: absolute;
            right: -2px;
            top: 0;
            bottom: -2px;
            width: 4px;
            background-color: #6366f1;
            pointer-events: none;
          }
          /* ── Pro Tip callout (must match globals.css public styles) ── */
          .ProseMirror .pro-tip-callout {
            position: relative;
            margin: 1.75rem 0;
            padding: 1.25rem 1.5rem 1.25rem 3.25rem;
            background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
            border: 1px solid #fcd34d;
            border-left: 5px solid #f59e0b;
            border-radius: 14px;
            color: #78350f;
            font-weight: 600;
            font-size: 1rem;
            line-height: 1.65;
            box-shadow: 0 1px 2px rgba(245, 158, 11, 0.08);
          }
          .ProseMirror .pro-tip-callout::before {
            content: '💡 PRO TIP';
            position: absolute;
            top: -0.65rem;
            left: 1rem;
            padding: 0.15rem 0.6rem;
            background: #f59e0b;
            color: #fff;
            font-size: 0.65rem;
            font-weight: 800;
            letter-spacing: 0.12em;
            border-radius: 999px;
            text-transform: uppercase;
            box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);
          }
          .ProseMirror .pro-tip-callout::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 1.1rem;
            transform: translateY(-50%);
            width: 1.5rem;
            height: 1.5rem;
            background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23d97706' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5'/%3E%3Cpath d='M9 18h6'/%3E%3Cpath d='M10 22h4'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-size: contain;
          }
          .ProseMirror .pro-tip-callout strong {
            color: #92400e;
          }
        `}</style>
        <EditorContent editor={editor} />
      </div>

    </div>
  );
}
