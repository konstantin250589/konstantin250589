function modal(triggerSelector, modalSelector, closeSelector) {

        const btnsModal = document.querySelectorAll(triggerSelector),
              modalClose = document.querySelector(closeSelector),
              modal = document.querySelector(modalSelector);

        const openModal = () => {
            modal.classList.add('show', 'fade');
            document.body.style.overflow = 'hidden';
        }

        const closeModal = () => {
            modal.classList.remove('show', 'fade');
            document.body.style.overflow = '';
        }

        btnsModal.forEach(btn => {
            btn.addEventListener('click', () => {
                openModal();
                clearInterval(timerId);
            });
        });

        modalClose.addEventListener('click', (e) => {
            closeModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
                
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
            }
        });

        const timerId = setTimeout(openModal, 4000);

        const showModalByScroll = () => {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
				clearInterval(timerId);

                window.removeEventListener('scroll', showModalByScroll);
            }
        }

        window.addEventListener('scroll', showModalByScroll);
    }

export default modal;