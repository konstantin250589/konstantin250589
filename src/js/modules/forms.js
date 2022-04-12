import {postData} from '../services/services';

function forms() {
    const forms = document.querySelectorAll('form');

	const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindpostData(item);
    });


    function bindpostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data);
				showThanksModal(message.success);
				statusMessage.remove();
			}).catch(() => {
				showThanksModal(message.failure);
			}).finally(() => {
				form.reset();
			})
        });
    }

	function showThanksModal(message) {

		const modalDialog = document.querySelector('.modal');

		modalDialog.classList.add('hide');
		document.querySelector('.overlay').classList.add('show');
		document.body.style.overflow = 'hidden';

		const thanksModal = document.createElement('div');

		thanksModal.classList.add('form__modal');

		thanksModal.innerHTML = `
			<div class="form__modal-subtitle">${message}</div>
		`;

		document.querySelector('.overlay').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
			document.querySelector('.overlay').classList.remove('show');
            document.body.style.overflow = '';
        }, 4000);
	}
}

export default forms;
	