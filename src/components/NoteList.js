import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, deleteNote, editNote }) => {
  return (
    <div>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          editNote={editNote}
        />
      ))}
    </div>
  );
};

export default NoteList;
