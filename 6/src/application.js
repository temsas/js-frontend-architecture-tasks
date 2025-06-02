import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

// Этот объект можно использовать для того, чтобы обрабатывать ошибки сети.
// Это необязательное задание, но крайне рекомендуем попрактиковаться.
const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// Используйте эту функцию для выполнения валидации.
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках.
const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

// BEGIN
export default () => {
  const state = {
    form: {
      fields: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      errors: {},
      isValid: false,
      submissionStatus: 'idle',
    },
  };

  const form = document.querySelector('[data-form="sign-up"]');
  const container = document.querySelector('[data-container="sign-up"]');
  const submitButton = form.querySelector('input[type="submit"]');

  const watchedState = onChange(state, (path, value) => {
    if (path.startsWith('form.fields')) {
      watchedState.form.errors = validate(watchedState.form.fields);
      watchedState.form.isValid = isEmpty(watchedState.form.errors);
    }

    if (path.startsWith('form.errors') || path === 'form.isValid') {
      ['name', 'email', 'password', 'passwordConfirmation'].forEach((fieldName) => {
        const input = form.querySelector(`[name="${fieldName}"]`);
        const errorDiv = input.nextElementSibling?.classList.contains('invalid-feedback')
            ? input.nextElementSibling
            : null;

        if (has(watchedState.form.errors, fieldName)) {
          input.classList.add('is-invalid');
          if (!errorDiv) {
            const newErrorDiv = document.createElement('div');
            newErrorDiv.classList.add('invalid-feedback');
            newErrorDiv.textContent = watchedState.form.errors[fieldName].message;
            input.parentElement.appendChild(newErrorDiv);
          } else {
            errorDiv.textContent = watchedState.form.errors[fieldName].message;
          }
        } else {
          input.classList.remove('is-invalid');
          if (errorDiv) {
            errorDiv.remove();
          }
        }
      });

      submitButton.disabled = !watchedState.form.isValid || watchedState.form.submissionStatus === 'submitting';
    }

    if (path === 'form.submissionStatus') {
      if (value === 'success') {
        container.innerHTML = 'User Created!';
      } else if (value === 'error') {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('invalid-feedback', 'd-block');
        errorDiv.textContent = errorMessages.network.error;
        form.appendChild(errorDiv);
      }
    }
  });

  ['name', 'email', 'password', 'passwordConfirmation'].forEach((fieldName) => {
    const input = form.querySelector(`[name="${fieldName}"]`);
    input.addEventListener('input', (e) => {
      watchedState.form.fields[fieldName] = e.target.value;
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!watchedState.form.isValid) return;

    watchedState.form.submissionStatus = 'submitting';

    const response = await axios.post(routes.usersPath(), watchedState.form.fields);
    if (response) {
      watchedState.form.submissionStatus = 'success';
    } else {
      watchedState.form.submissionStatus = 'error';
    }
  });
};
// END
