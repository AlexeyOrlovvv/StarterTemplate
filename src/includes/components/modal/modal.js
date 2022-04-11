document.addEventListener('click', (event) => {
    const openModalButton = event.target.closest('.button_openModal');
    if (openModalButton) {
        document.getElementById(openModalButton.dataset.open)?.classList.add('visible');
    }
});

document.addEventListener('mousedown', (event) => {
    const modal = event.target.closest('.modal');
    if (modal && (!event.target.closest('.modal__content') || event.target.closest('.button_closeModal'))) {
        modal.classList.remove('visible');
    }
});