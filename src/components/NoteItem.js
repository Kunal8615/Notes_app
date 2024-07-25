import React from 'react';

const NoteItem = ({ note, deleteNote, editNote }) => {
  return (
    <div className="note-item">
      <h3>{note.title}</h3>
      <p className='text2'>{note.content}</p>
      <small>{new Date(note.timestamp).toLocaleString()}</small>
      <div className='container'>

      <button id='edit' onClick={() => editNote(note)}>Edit</button>
      <button id='delete' onClick={() => deleteNote(note.id)}>Delete</button>
      </div>
    </div>
  );
};

export default NoteItem;
