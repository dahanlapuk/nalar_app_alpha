import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, Heading3, List, ListOrdered, Quote } from 'lucide-react';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useWritingProgress } from '../context/WritingProgressContext';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-editorial-text/10 pb-4 mb-6">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 hover:bg-black/5 rounded transition-colors ${
          editor.isActive('bold') ? 'bg-black/10 text-black' : 'text-editorial-muted'
        }`}
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 hover:bg-black/5 rounded transition-colors ${
          editor.isActive('italic') ? 'bg-black/10 text-black' : 'text-editorial-muted'
        }`}
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`p-2 hover:bg-black/5 rounded transition-colors ${
          editor.isActive('underline') ? 'bg-black/10 text-black' : 'text-editorial-muted'
        }`}
      >
        <UnderlineIcon size={16} />
      </button>
      <div className="w-[1px] h-4 bg-editorial-text/20 mx-2" />
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 hover:bg-black/5 rounded transition-colors ${
          editor.isActive('heading', { level: 1 }) ? 'bg-black/10 text-black' : 'text-editorial-muted'
        }`}
      >
        <Heading1 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 hover:bg-black/5 rounded transition-colors ${
          editor.isActive('heading', { level: 2 }) ? 'bg-black/10 text-black' : 'text-editorial-muted'
        }`}
      >
        <Heading2 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 hover:bg-black/5 rounded transition-colors ${
          editor.isActive('heading', { level: 3 }) ? 'bg-black/10 text-black' : 'text-editorial-muted'
        }`}
      >
        <Heading3 size={16} />
      </button>
      <div className="w-[1px] h-4 bg-editorial-text/20 mx-2" />
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 hover:bg-black/5 rounded transition-colors ${
          editor.isActive('bulletList') ? 'bg-black/10 text-black' : 'text-editorial-muted'
        }`}
      >
        <List size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 hover:bg-black/5 rounded transition-colors ${
          editor.isActive('orderedList') ? 'bg-black/10 text-black' : 'text-editorial-muted'
        }`}
      >
        <ListOrdered size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 hover:bg-black/5 rounded transition-colors ${
          editor.isActive('blockquote') ? 'bg-black/10 text-black' : 'text-editorial-muted'
        }`}
      >
        <Quote size={16} />
      </button>
    </div>
  );
};

export interface EditorRef {
  insertContent: (content: string) => void;
}

const Editor = forwardRef<EditorRef, {}>((props, ref) => {
  const [wordCount, setWordCount] = useState(0);
  const { projectTitle } = useWritingProgress();

  const defaultContent = `
    <p>Menurut pengamatan awal, literasi digital di kalangan siswa SMA masih rendah. Banyak siswa yang hanya mengonsumsi informasi dari media sosial tanpa melakukan verifikasi. Hal ini berdampak signifikan pada kemampuan mereka membedakan fakta dari opini, yang pada akhirnya memengaruhi prestasi belajar mereka dalam tugas-tugas yang membutuhkan riset mendalam.</p>
    <p>Penelitian ini bertujuan untuk mengeksplorasi hubungan antara tingkat literasi digital dengan nilai ujian akhir semester pada mata pelajaran yang membutuhkan literasi tinggi. Saya juga akan mengkaji...</p>
  `;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
    ],
    content: defaultContent,
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[400px] font-serif',
      },
    },
  });

  useImperativeHandle(ref, () => ({
    insertContent: (content: string) => {
      if (editor) {
        editor.chain().focus().insertContent(content).run();
      }
    }
  }));

  useEffect(() => {
    if (editor) {
      const text = editor.getText();
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
    }
  }, [editor]);

  return (
    <div className="flex flex-col h-full bg-white border border-editorial-text/10 p-8 shadow-sm">
      <div className="mb-8">
        <h1 className="text-3xl font-serif italic font-bold mb-2 whitespace-pre-wrap">{projectTitle}</h1>
        <p className="text-xs uppercase tracking-[0.2em] text-editorial-muted">Bab 1 – Pendahuluan</p>
      </div>
      <MenuBar editor={editor} />
      <div className="flex-grow overflow-y-auto tiptap-container">
        <EditorContent editor={editor} />
      </div>
      <div className="mt-8 pt-4 border-t border-editorial-text/10 flex justify-between items-center text-[10px] uppercase tracking-widest text-editorial-muted font-bold">
        <span>Draft Autosaved</span>
        <span>{wordCount} Words</span>
      </div>
    </div>
  );
});

export default Editor;

