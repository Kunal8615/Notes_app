import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import Pagination from './components/Pagination';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const editNote = (updatedNote) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
    setCurrentNote(null);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const searchNotes = (query) => {
    setSearchQuery(query.toLowerCase());
    setCurrentPage(1); 
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery) ||
      note.content.toLowerCase().includes(searchQuery)
  );

  const notesPerPage = 10;
  const startIndex = (currentPage - 1) * notesPerPage;
  const currentNotes = filteredNotes.slice(startIndex, startIndex + notesPerPage);

  return (
    <>
   
      <h1 className='heading'>Note Taking App</h1>
    <div className="app">
      <NoteForm
        addNote={addNote}
        editNote={editNote}
        currentNote={currentNote}
        clearCurrentNote={() => setCurrentNote(null)}
      />
      <input
        className='search'
        type="text"
        placeholder="Search notes..."
        onChange={(e) => searchNotes(e.target.value)}
      />
      <NoteList
        notes={currentNotes}
        deleteNote={deleteNote}
        editNote={setCurrentNote}
      />
      <Pagination
        totalNotes={filteredNotes.length}
        notesPerPage={notesPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
    </>
  );
};

export default App;
