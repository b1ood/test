const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]'),
    tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl)),
    elemModal = document.getElementById('modal');

const modal = new bootstrap.Modal(elemModal);

const form = document.querySelector('form'),
    memberName = document.getElementById('memberName'),
    memberMail = document.getElementById('memberMail'),
    seminarsList = document.getElementById('select'),
    submitBtn = document.getElementById('submit'),
    loading = document.querySelector('.loading'),
    container = document.querySelector('.container');

const validStatuses = [...document.querySelectorAll('.invalid-feedback')];

const NAME_REGEXP = /^[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?$/,
    EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

memberName.addEventListener('input', () => {
    if (NAME_REGEXP.test(memberName.value)) {
        validStatuses[0].style.display = 'none';
        memberName.classList.remove('is-invalid');
        memberName.classList.add('is-valid');
    } else {
        validStatuses[0].style.display = 'block';
        memberName.classList.remove('is-valid');
        memberName.classList.add('is-invalid');
    }
});

memberMail.addEventListener('input', () => {
    if (EMAIL_REGEXP.test(memberMail.value)) {
        validStatuses[1].style.display = 'none';
        memberMail.classList.remove('is-invalid');
        memberMail.classList.add('is-valid');
    } else {
        validStatuses[1].style.display = 'block';
        memberMail.classList.remove('is-valid');
        memberMail.classList.add('is-invalid');
    }
});

form.addEventListener('change', (event) => {
    if (!NAME_REGEXP.test(memberName.value) ||
        !EMAIL_REGEXP.test(memberMail.value) ||
        seminarsList.selectedIndex === 0) {
        submitBtn.setAttribute('disabled', '');
    } else {
        submitBtn.removeAttribute('disabled');
    }
});

const URL = 'https://jsonplaceholder.typicode.com/posts';

submitBtn.onclick = async function addMember(event) {

    event.preventDefault();

    loading.classList.toggle('d-none');
    container.style.opacity = '.7';

    const newMember = {
        name: memberName.value,
        email: memberMail.value,
        seminar: seminarsList.options[seminarsList.selectedIndex].text,
    }

    let response = await fetch(URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(newMember)
    });

    if (response.ok) {
        clearFields();
        loading.classList.toggle('d-none');
        container.style.opacity = '1';
        modal.show();
    }
}

function clearFields() {
    let fields = [memberName, memberMail];

    for (let i = 0; i < fields.length; i++) {
        fields[i].classList.remove('is-valid');
        fields[i].value = '';
        seminarsList.selectedIndex = 0;
    }

    submitBtn.setAttribute('disabled', '');
}