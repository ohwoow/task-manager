const Note = {
    idCounter: 8, // кол-во заметок
    dragged: null, // перетаскиваемый элемент

    process(noteEl) {
        // изменение текста в заметке
        noteEl.addEventListener('dblclick', () => {
            noteEl.setAttribute('contenteditable', 'true')
            noteEl.removeAttribute('draggable')
            noteEl.closest('.column').removeAttribute('draggable')
            noteEl.focus()
        })

        noteEl.addEventListener('blur', () => {
            noteEl.removeAttribute('contenteditable')
            noteEl.setAttribute('draggable', 'true')
            noteEl.closest('.column').setAttribute('draggable', 'true')
            if (!noteEl.textContent.trim().length) {
                noteEl.remove()
            }
        })
        noteEl.addEventListener('dragstart', Note.dragstart)
        noteEl.addEventListener('dragend', Note.dragend)
        noteEl.addEventListener('dragenter', Note.dragenter)
        noteEl.addEventListener('dragover', Note.dragover)
        noteEl.addEventListener('dragleave', Note.dragleave)
        noteEl.addEventListener('drop', Note.drop)
    },
    // Drag'n'Drop

    dragstart(event) {
    event.stopPropagation()

    Note.dragged = this
    this.classList.add('dragged')
},

    dragend(event) {
        Note.dragged = null
        this.classList.remove('dragged')

        notes.forEach(item => item.classList.remove('under'))
    },

     dragenter(event) {
        if (this === Note.dragged) {
            return
        }
        this.classList.add('under')
    },

     dragover(event) {
        event.preventDefault()

        if (this === Note.dragged) {
            return
        }
    },

     dragleave(event) {
        if (this === Note.dragged) {
            return
        }
        this.classList.remove('under')
    },

     drop(event) {
        event.stopPropagation()
        if (this === Note.dragged) {
            return
        }

        // если родитель заменяемого элемента равен родителю перетаскиваего эллемента
        if (this.parentElement === Note.dragged.parentElement) {
            // ищем все заметки у родителя заменямой зментки
            const note = Array.from(this.parentElement.querySelectorAll('.note'))
            // индекс заменяемой заметки
            const indexA = note.indexOf(this)
            // индекс перетаскиваемой заметки
            const indexB = note.indexOf(Note.dragged)

            // если индексА меньше индексаБ, то мы
            if (indexA < indexB) {
                this.parentElement.insertBefore(Note.dragged, this)
            } else {
                this.parentElement.insertBefore(Note.dragged, this.nextElementSibling)
            }
        } else {
            this.parentElement.insertBefore(Note.dragged, this)
        }
    }
}
