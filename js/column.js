const Column = {
    idCounter: 4,
    process(columnEl) {
        // Добавляем новую заметку в колонку
        const addNote = columnEl.querySelector('[data-action-addNote]')

        addNote.addEventListener('click', () =>  {
            const noteElement = document.createElement('div')
            noteElement.classList.add('note')
            noteElement.setAttribute('draggable', 'true')
            noteElement.setAttribute('data-note-id', Note.idCounter)

            Note.idCounter++
            columnEl.querySelector('[data-notes]').append(noteElement)

            Note.process(noteElement)

            noteElement.setAttribute('contenteditable', 'true')
            noteElement.focus()
        })
        const colHeader = columnEl.querySelector('.column-header')
        colHeader.addEventListener('dblclick', () => {
            colHeader.setAttribute('contenteditable', 'true')
            colHeader.focus()
        })

        colHeader.addEventListener('blur', () => {
            colHeader.removeAttribute('contenteditable')
        })

        columnEl.addEventListener('dragover', function (event) {
            event.preventDefault()
        })

        columnEl.addEventListener('drop', function (event) {
            if (Note.dragged) {
                columnEl.querySelector('[data-notes]').append(Note.dragged)
            }
        })
    },
    add() {
        addColumn.addEventListener('click', () => {
            const newColumn = document.createElement('div')
            newColumn.classList.add('column')
            newColumn.setAttribute('draggable', 'true')
            newColumn.setAttribute('data-column-id', Column.idCounter)

            newColumn.innerHTML = `
            <p class="column-header" contenteditable="true">В плане</p>
            <div data-notes></div>
            <p class="column-footer">
                <span data-action-addNote class="action">+ Добавить карточку</span>
            </p>
            `
            Column.idCounter++
            document.querySelector('.columns').append(newColumn)
            Column.process(newColumn)
        })
    }
}