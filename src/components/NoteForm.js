import React, { useState, useEffect } from 'react';

const NoteForm = ({ addNote, editNote, currentNote, clearCurrentNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [currentNote]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (currentNote) {
      editNote({
        ...currentNote,
        title,
        content,
        timestamp: new Date().toISOString(),
      });
    } else {
      addNote({
        id: Date.now(),
        title,
        content,
        timestamp: new Date().toISOString(),
      });
    }
    clearCurrentNote();
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className='content'
        required
      />
      <button id='add-update' type="submit">{currentNote ? 'Update Note' : 'Add Note'}</button>
      {currentNote && <button id='add-update' type="button" onClick={clearCurrentNote}>Cancel</button>}
    </form>
  );
};

export default NoteForm;
