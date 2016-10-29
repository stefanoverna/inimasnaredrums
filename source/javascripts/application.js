//= require headroom
//= require baguette
//= require smooth-scroll
//= require switch-to-video

baguetteBox.run('.js-gallery');
smoothScroll.init();
new Headroom(document.querySelector(".main-nav"), { offset: 400 }).init();

var form = document.getElementById('js-contact-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  event.stopPropagation();

  var fields = ['email', 'name', 'phone', 'message'];
  var requiredFields = ['email', 'name', 'message'];

  var button = form.querySelector('button');

  var fieldInputs = fields.reduce(function(acc, field) {
    acc[field] = form.querySelector('[name=' + field + ']');
    return acc;
  }, {});

  var formData = fields.reduce(function(acc, field) {
    acc[field] = fieldInputs[field].value.trim();
    return acc;
  }, {});

  var isInvalid = false;

  for (var field in formData) {
    var value = formData[field];
    var isValid = requiredFields.indexOf(field) === -1 || value;
    var parent = fieldInputs[field].parentElement;

    parent.classList.toggle('form__field--invalid', !isValid);
    if (isValid) {
      var error = parent.querySelector('.form__error');
      if (error) {
        parent.removeChild(error);
      }
    } else {
      isInvalid = true;
      var error = document.createElement('div');
      error.classList.add('form__error');
      error.textContent = 'Questo campo è obbligatorio!';
      parent.appendChild(error);
    }
  }

  if (isInvalid) {
    alert('Alcuni campi obbligatori non sono stati compilati: perfavore ricontrolla il form!');
    return;
  }

  fields.forEach(function(field) {
    fieldInputs[field].disabled = true;
  });
  button.disabled = true;

  var request = new XMLHttpRequest();

  request.open('POST', 'http://cc-submit.herokuapp.com/hook/2gqbiw', true);

  request.onload = function() {
    alert('La richiesta è stata inviata correttamente! Riceverai una risposta non appena possibile!');
    button.disabled = false;
    fields.forEach(function(field) {
      fieldInputs[field].value = '';
      fieldInputs[field].disabled = false;
    });
  };

  request.onerror = function(e) {
    alert('Ouch! Abbiamo avuto un problema nell\'inviare la richiesta... :/');
    button.disabled = false;
  };

  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(formData));
});
