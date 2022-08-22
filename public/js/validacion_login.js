window.addEventListener('load', function() {
    let form_login = document.querySelector('form.log_form')
    
    form_login.addEventListener('submit', function(event) {
        let errores = [];

        //Email
        let user_email = document.querySelector('input.email_input');
        if (user_email.value == "") {
            errores.push('El campo de email debe estar completo.')
        }

        //Contraseña
        let user_password = document.querySelector('input.psw_input');
        if (user_password.value == "") {
            errores.push('Debes ingresar tu contraseña.')
        }

        //Errores
        if (errores.length > 0) {
            event.preventDefault();

            let ulErrores = document.querySelector('div.text-danger ul');

            ulErrores.innerHTML = '';
            
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += '<li>' + errores[i] + '</li>';
                
            };
        }
    })
})