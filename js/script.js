// все колонки с текстом
const column = document.querySelectorAll('.column')

// кнопка "добавить колонку"
const addColumn = document.querySelector('[data-action-addColumn]')

// все заметки
const notes = document.querySelectorAll('.note')



// * Фукнции

column.forEach(Column.process)
notes.forEach(Note.process)
Column.add()




