    window.addEventListener("load", function(){

        let formulario = document.getElementById("formCart");
     
  
        let expresiones = {
            nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
            edad: /^\d{1,2}$/,//numeros del 0 al 9 de una o dos cifras
            dni:/^\d{7,8}$/,//numeros del 0 al 9 de una o dos cifras
            codigoPostal: /^\d{3,5}$/,
            correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            telefono: /^\d{9,11}$/, // 7 a 11 numeros.
            nro_tarjeta: /^\d{16}$/,
            codigo_seguridad: /^\d{3,4}$/
        } 

        let validar_formulario = function(e){
            switch (e.target.name){
                case "first_name":
                validar_campo(expresiones.nombre, e.target, "nombre");
                break;

                case "last_name":
                validar_campo(expresiones.nombre, e.target, "apellido");
                break;
                
                case "birth_date":
                         if((e.target.value)!== ""){
                   
                            document.getElementById("fecha_nac").classList.remove("validacion_incorrecta");
                            document.getElementById("fecha_nac").classList.add("validacion_correcta");
                            document.querySelector("#fecha_nac i").classList.remove("fa-circle-xmark");
                            document.querySelector("#fecha_nac i").classList.add("fa-circle-check");
                            document.querySelector("#fecha_nac .mensaje_error").classList.remove("mensaje_error-activo");
                            
                        }else{
                            document.getElementById("fecha_nac").classList.add("validacion_incorrecta");
                            document.getElementById("fecha_nac").classList.remove("validacion_correcta");
                            document.querySelector("#fecha_nac i").classList.add("fa-circle-xmark");
                            document.querySelector("#fecha_nac i").classList.remove("fa-circle-check");
                            document.querySelector("#fecha_nac .mensaje_error").classList.add("mensaje_error-activo");
                            
                         }
            
                break;
                
                case "age":
                validar_campo(expresiones.edad, e.target, "edad");
                break;

                case "identity_document":
                validar_campo(expresiones.dni, e.target, "documento");
                break;
                
                case "home":
                        if((e.target.value) !== ""){
                   
                            document.getElementById("domicilio").classList.remove("validacion_incorrecta");
                            document.getElementById("domicilio").classList.add("validacion_correcta");
                            document.querySelector("#domicilio i").classList.remove("fa-circle-xmark");
                            document.querySelector("#domicilio i").classList.add("fa-circle-check");
                            document.querySelector("#domicilio .mensaje_error").classList.remove("mensaje_error-activo");
                            
                        }else{
                            document.getElementById("domicilio").classList.add("validacion_incorrecta");
                            document.getElementById("domicilio").classList.remove("validacion_correcta");
                            document.querySelector("#domicilio i").classList.add("fa-circle-xmark");
                            document.querySelector("#domicilio i").classList.remove("fa-circle-check");
                            document.querySelector("#domicilio .mensaje_error").classList.add("mensaje_error-activo");
                            
                        }
            
                break;
                case "postal_code":
                validar_campo(expresiones.codigoPostal, e.target, "codigo_postal");
                break;
                case "email_alternative":
                validar_campo(expresiones.correo, e.target, "correo");
                break;
                       
                case "phone_number":
                        validar_campo(expresiones.telefono, e.target, "telefono");
                break;
                        
               
                case "card_number":
                        validar_campo(expresiones.nro_tarjeta, e.target, "nro_tarjeta");
                break;
                       
                
               
                case "name_card_holder":

                        validar_campo(expresiones.nombre, e.target, "titular");
        
                break;
                case "expiration":
                        if((e.target.value)!== ""){
                       
                                document.getElementById("vencimiento").classList.remove("validacion_incorrecta");
                                document.getElementById("vencimiento").classList.add("validacion_correcta");
                                document.querySelector("#vencimiento i").classList.remove("fa-circle-xmark");
                                document.querySelector("#vencimiento i").classList.add("fa-circle-check");
                                document.querySelector("#vencimiento .mensaje_error").classList.remove("mensaje_error-activo");
                                
                        }else{
                                document.getElementById("vencimiento").classList.add("validacion_incorrecta");
                                document.getElementById("vencimiento").classList.remove("validacion_correcta");
                                document.querySelector("#vencimiento i").classList.add("fa-circle-xmark");
                                document.querySelector("#vencimiento i").classList.remove("fa-circle-check");
                                document.querySelector("#vencimiento .mensaje_error").classList.add("mensaje_error-activo");
                                
                        }
                break;

                case "security_code":
                        validar_campo(expresiones.codigo_seguridad, e.target, "codigo_seguridad");
                break;
            
                }
        }

         function validar_campo (expresion, input, campo){
                if(expresion.test(input.value)){
                       
                    document.getElementById(`${campo}`).classList.remove("validacion_incorrecta");
                    document.getElementById(`${campo}`).classList.add("validacion_correcta");
                    document.querySelector(`#${campo} i`).classList.remove("fa-circle-xmark");
                    document.querySelector(`#${campo} i`).classList.add("fa-circle-check");
                    document.querySelector(`#${campo} .mensaje_error`).classList.remove("mensaje_error-activo");
                    
            }else{
                    document.getElementById(`${campo}`).classList.add("validacion_incorrecta");
                    document.getElementById(`${campo}`).classList.remove("validacion_correcta"); 
                    document.querySelector(`#${campo} i`).classList.add("fa-circle-xmark");
                    document.querySelector(`#${campo} i`).classList.remove("fa-circle-check");
                    document.querySelector(`#${campo} .mensaje_error`).classList.add("mensaje_error-activo");
                    
            }
         }
        let inputs = document.querySelectorAll("input");
        inputs.forEach((input)=>{
            input.addEventListener("keyup",(validar_formulario));
            input.addEventListener("blur",(validar_formulario));
              
               
               
        })
})
       
   






