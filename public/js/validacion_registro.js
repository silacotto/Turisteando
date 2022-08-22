window.addEventListener('load', function() {
    let form_register = document.querySelector('form.reg_form');

    form_register.addEventListener('submit', function(event) {
        let errores = [];

        //Nombre Usuario
        let user_name = document.querySelector('input.user_name');
        if (user_name.value == "") {
            errores.push('El campo de nombre debe estar completo.')
        } else if (user_name.value.length < 2) {
            errores.push('El campo debe tener al menos 2 caracteres.')
        }

        //Email
        let user_email = document.querySelector('input.user_email');
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (user_email.value == "") {
            errores.push('El campo email debe estar completo.')
        } 
        // else if (user_email.value.match(validRegex) == null) {
        //     errores.push('Debes ingresar un formato de email válido.')
        // }

        //Contraseña
        let user_password = document.querySelector('input.user_psw');
        if (user_password.value == "") {
            errores.push('Debe ingresar una contraseña.')
        } else if (user_password.length < 8) {
            errores.push('El campo debe tener al menos 8 caracteres.')
        }

        //RepContraseña
        let user_repassword = document.querySelector('input.user_repsw');
        if (user_repassword.value == "") {
            errores.push('Debes repetir la contraseña.');
        } else if (user_repassword.value != user_password.value) {
            errores.push('La contraseña de verificación no coincide. Intentalo de nuevo.');
        }

        //Imagen
        let etiqueta_imagen = document.querySelector('label.user_imagen');
        let etiqueta = etiqueta_imagen.innerHTML;
        //console.log(etiqueta);

        let extensiones_aceptadas = ['.jpg', '.jpeg', '.png', '.gif'];
        let bandera = false;
        for (let  extension in extensiones_aceptadas) {
            if (etiqueta.indexOf(extension) !== -1) {
                bandera = true;
            };
        };
        //console.log(bandera);
        
        // Si posicion es igual a -1, significa que no se encontro la descripcion de la imagen 
        if (bandera == false) {
            let package_image = document.querySelector('input.avatar_input');
            if (package_image.value == '') {
                errores.push('Debes cargar una imagen');
            };
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