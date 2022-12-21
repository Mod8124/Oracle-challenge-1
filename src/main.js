const btnEncrypt = document.querySelector('.cta-ctaButton--blue'),
  btnDecrypt = document.querySelector('.cta__ctaButton--grey'),
  btnCopy = document.querySelector('.cta-ctaButton-desative'),
  text = document.querySelector('textarea'),
  divResult = document.querySelector('.result'),
  textarea = document.querySelector('textarea'),
  para = document.querySelector('.result__paragraph'),
  error = document.querySelector('.cta_ctaInfowrapper');
(regexUppercase = new RegExp(/[A-Z]/g)),
  (regexAccents = new RegExp(/[áéíóúñ]/gi));
let textResult, str;

const KEYS_ENCRYPT = {
  e: 'enter',
  i: 'imes',
  a: 'ai',
  o: 'ober',
  u: 'ufat',
};

const KEYS_REVERSEENCRYPT = {
  enter: 'e',
  imes: 'i',
  ai: 'a',
  ober: 'o',
  ufat: 'u',
};

const isUpperCaseOrIsAccent = (text) => {
  return text.match(regexAccents) || text.match(regexUppercase);
};

const toEncrypt = (text) => {
  const rgx_keys_encrypt = new RegExp(/[eiou]/gi);
  return text.replace(rgx_keys_encrypt, (word) => KEYS_ENCRYPT[word]);
};

const toReverseEncrypt = (text) => {
  const rgx_keys_reverseEncrypt = new RegExp(/enter|imes|ai|ober|ufat/gi);
  return text.replace(
    rgx_keys_reverseEncrypt,
    (word) => KEYS_REVERSEENCRYPT[word]
  );
};

function animate() {
  let running = setTimeout(animate, 145);
  str.length > 0 ? (para.innerHTML += str.shift()) : clearTimeout(running);
}

const handleClick = (mode = 'encrypt') => {
  const text = textarea.value;
  let isCheck = isUpperCaseOrIsAccent(text);
  if (isCheck !== null || text.length === 0) {
    error.classList.add('active');
  } else {
    error.classList.remove('active');
    textResult = mode === 'decrypt' ? toReverseEncrypt(text) : toEncrypt(text);
    para.innerHTML = '';
    str = textResult.split('');
    divResult.classList.add('active');
    animate();
  }
};

const handleCopy = () => {
  navigator.clipboard.writeText(textResult);
  btnCopy.classList.add('copy');
  setTimeout(() => btnCopy.classList.remove('copy'), 2000);
};

const isEmpty = (event) => {
  const value = event.target.value;
  if (value.length === 0) {
    divResult.classList.remove('active');
    para.innerHTML = '';
  }
};

textarea.addEventListener('input', isEmpty);
btnEncrypt.addEventListener('click', handleClick);
btnDecrypt.addEventListener('click', () => handleClick('decrypt'));
btnCopy.addEventListener('click', handleCopy);
