// App.js
import React, { useState } from 'react';
import './style.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Добавление новой заметки
  const addNote = () => {
    if (newNote.trim() !== '') {
      const note = {
        id: Date.now(),
        text: newNote.trim(),
        date: new Date().toLocaleString(),
      };
      setNotes([...notes, note]);
      setNewNote('');
    }
  };

  // Удаление заметки
  const deleteNote = id => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Обработка нажатия Enter
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      addNote();
    }
  };

  return (
    <div className='app'>
      <div className='container'>
        <h1>Мои заметки</h1>

        {/* Форма добавления заметки */}
        <div className='add-note'>
          <input
            type='text'
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Введите текст заметки...'
            maxLength={200}
          />
          <button onClick={addNote} disabled={!newNote.trim()}>
            Добавить
          </button>
        </div>

        {/* Список заметок */}
        <div className='notes-list'>
          {notes.length === 0 ? (
            <p className='empty-message'>Заметок пока нет</p>
          ) : (
            notes.map(note => (
              <div key={note.id} className='note'>
                <div className='note-content'>
                  <p>{note.text}</p>
                  <span className='note-date'>{note.date}</span>
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className='delete-btn'
                  aria-label='Удалить заметку'
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* Статистика */}
        {notes.length > 0 && (
          <div className='stats'>Всего заметок: {notes.length}</div>
        )}
      </div>
    </div>
  );
}

export default App;
