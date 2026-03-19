const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const searchForm = document.getElementById('search-form');
const searchInputField = document.getElementById('search-input-field');
const noteCards = Array.from(document.getElementsByClassName('note-card'));
const noteCategory = document.getElementById('note-category');
const noteDeleteBtns = Array.from(document.getElementsByClassName('delete-btn'));
const trashForm = document.getElementById('trash-form');
const deleteForm = document.getElementById('delete-form');
const modalOverlay = document.getElementById('deleteModalOverlay');
const modalDeleteBtn = document.getElementById('modalDelete');

function openDrawer() {
    drawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    drawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
})

function closeDrawer() {
    drawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeDrawer();
    }
});

noteDeleteBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        modalOverlay.classList.add('open');

        const note = btn.closest('.note-card');
        const noteId = note.getAttribute('id');

        const destination = btn.getAttribute('id');

        if (destination === "trash") {
            deleteForm.setAttribute('action', `/petal/notes/${noteId}/delete`);
        } else {
            trashForm.setAttribute('action', `/petal/notes/${noteId}/trash?redirectTo=/petal/notes/${destination}`);
        }

    })
})

modalOverlay.addEventListener('click', () => {
    modalOverlay.classList.remove('open');
})