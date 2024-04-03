<script>
  var g_EC = {
    "email" : "[name='email']",
    "phone_number" : "[name='mobilephone']"
  };

  window.g_setupEC = Object.create(null);
  window.g_ECObj = Object.create(null);

  var g_countryCode = '52';

  document.addEventListener('input', g_setup_ECObj);

  function g_setup_ECObj(e) {
    var input = e.target;
    for(i in g_EC) {
      if(input.matches(g_EC[i])) g_setupEC['g_' + i] = input.value;
    }

    g_save_toECObj();
  }

  function g_save_toECObj() {
    for(i in g_EC) {
      if(g_setupEC['g_' + i] && i === 'email' && g_validateMail(g_setupEC['g_' + i])) window.g_ECObj[i] = g_setupEC['g_' + i];
      if(g_setupEC['g_' + i] && i === 'phone_number') {
        var cleanedPhone = g_validatePhone(g_setupEC['g_' + i]);
        var finalPhone = cleanedPhone.includes('+') ? cleanedPhone : cleanedPhone.includes(g_countryCode) ? '+' + cleanedPhone : '+' + g_countryCode + cleanedPhone;
        finalPhone.length >= 11 && finalPhone.length <= 15 ? (window.g_ECObj[i] = finalPhone) : delete window.g_ECObj[i];
      }
    }
  }

  function g_validateMail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function g_validatePhone(tel) {
    return tel.replace(/\D/g, '');
  }

  g_save_toECObj();

  document.addEventListener('click', function(e) {
    if(e.srcElement.name == "ENVIAR") {
      console.log("Sending...");
      var g_getInputs = e.target.closest("form").querySelectorAll("input[required]")
      var g_getErrors = []

      g_getInputs.forEach(function(input) {
        if(input.type == "text") {
          if(input.value == '') {
            g_getErrors.push('Please enter a value for ' + input.name);
          }
        }
        if(input.type == "email") {
          if(input.value == '') {
            g_getErrors.push('Please enter a value for ' + input.name);
          }else if(!g_validateMail(input.value)) {
            g_getErrors.push('Please enter a valid email format for ' + input.name);
          }
        }
        if(input.type == "tel") {
          if(input.value == '') {
            g_getErrors.push('Please enter a value for ' + input.name);
          }
        }
        if(input.type == "checkbox") {
          if(!input.checked) {
            g_getErrors.push('Please accept the terms');
          }
        }
      });
      if(g_getErrors.length == 0) {
        console.log("Fields have been validated");
        dataLayer.push({
          'event' : 'submit'
        });
      }else {
        console.log(g_getErrors);
      }
    }
  });
</script>