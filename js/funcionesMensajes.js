function traerInformacionMensajes(){
    $.ajax({    
            url : 'http://129.151.123.56:8080/api/Message/all',
            type : 'GET',
            dataType : 'JSON',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            success : function(resultado) {
                $("#resultado").empty();
                tabla = "<center><table border='1'><tr><th>Mensaje<th>Doctor<th>Cliente<th>Acciones"
                filas = ""
                for(i = 0;  i < resultado.length; i++){
                   filas += "<tr>"
                   filas +="<td>"+resultado[i].messageText+"</td>"
                   filas +="<td>"+resultado[i].doctor.name+"</td>"
                   filas +="<td>"+resultado[i].client.name+"</td>"
                   filas +="<td><button onclick='eliminarMensaje("+resultado[i].idMessage+")'>Eliminar</button>"
                   filas += "<button onclick='actualizarMensaje("+resultado[i].idMessage+")'>Actualizar</button>"
                }
                $("#resultado").append(tabla + filas+"</tr></table></center>")
                console.log(resultado)
            }
        });
}

function buscarPorIDMensajes(id){
    if(!validarCampo(id))
        alert("Primero ingrese un dato en el campo "+id.attr("id"))
    else{
        $.ajax({    
            url : 'http://129.151.123.56:8080/api/Message/'+id.val(),
            dataType : 'JSON',
            type : 'GET',
            success : function(resultado) {
                tabla = "<center><table border='1'><tr><th>Mensaje<th>Doctor<th>Cliente<th>Acciones"
                filas =""
                if(resultado){
                    console.log(resultado)
                    $("#resultado").empty();
                    filas += "<tr>"
                    filas +="<td>"+resultado.messageText+"</td>"
                    filas +="<td>"+resultado.doctor.name+"</td>"
                    filas +="<td>"+resultado.client.name+"</td>"
                    filas +="<td><button onclick='eliminarMensaje("+resultado.idMessage+")'>Eliminar</button>"
                    filas += "<button onclick='actualizarMensaje("+resultado.idMessage+")'>Actualizar</button>"   
                    $("#resultado").append(tabla + filas+"</tr></table></center>")  
                }
                else{
                    alert("Doctor con ID "+id.val()+" no existe")
                }
            },
            error : function(xhr, status) {
                alert('ha sucedido un problema'+ xhr.status);
            },
            complete : function(xhr, status) {
                alert('Petición realizada '+xhr.status);
            }
        });
    }
}

function guardarMensaje(){ 
var datos ={ 
        messageText: $("#messageText").val(),
        client: {
            idClient: $("#client").val()
        },
        doctor: {
            id: $("#doctor").val()
        } 
    }

    $.ajax({    
        url : 'http://129.151.123.56:8080/api/Message/save',
        data : JSON.stringify(datos),
        type : 'POST',
        contentType: 'application/json',
        dataType: 'JSON',
        success : function(json, textStatus, xhr) {
    
        
        },
        error : function(xhr, status) {
           
            
        },
        complete : function(xhr, status) {
            alert('Petición realizada '+xhr.status);
            limpiarFormulario();
            window.location.href="mensajes.html";
        }
    });
}

function eliminarMensaje(idMensaje){    
    $.ajax({    
        url : 'http://129.151.123.56:8080/api/Message/'+idMensaje,
        dataType: 'JSON',
        type : 'DELETE',
        success : function(json, textStatus, xhr) {
            location.reload();
        
        },
        error : function(xhr, status) {
           
            
        },
        complete : function(xhr, status) {
            alert('Petición realizada '+xhr.status);
        }
    }); 
}

function actualizarMensaje(idMensaje){
    console.log(idMensaje)
    location.href="actualizarMensajes.html?variable="+idMensaje+"";
}

function cargarDatosMensaje(id){
        $.ajax({    
            url : 'http://129.151.123.56:8080/api/Message/'+id,
            dataType : 'JSON',
            type : 'GET',
            success : function(resultado) {
                $("#idMessage").val(resultado.idMessage)  
                $("#messageText").val(resultado.messageText) 
            },
            error : function(xhr, status) {
                alert('ha sucedido un problema'+ xhr.status);
            }
        });
}

function editarMensaje(){ 
    var datos={
        idMessage:$("#idMessage").val(),
        messageText:$("#messageText").val()
        }

    $.ajax({    
        url : 'http://129.151.123.56:8080/api/Message/update',
        data: JSON.stringify(datos),
        contentType: 'application/json',
        type : 'PUT',
        dataType: 'JSON',
        success : function(json, textStatus, xhr) {
    
        
        },
        error : function(xhr, status) {
           
            
        },
        complete : function(xhr, status) {
            alert('Petición realizada '+xhr.status);
            limpiarFormulario();
            window.location.href="mensajes.html";
        }
    });
}

function cargarDatosSelectDoctor(){
    $.ajax({    
            url : 'http://129.151.123.56:8080/api/Doctor/all',
            type : 'GET',
            dataType : 'JSON',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            success : function(resultado) {
                $("#doctor").empty();
                options = ""
                options += "<option value='' selected>Seleccione doctor</option>"
                for(i = 0;  i < resultado.length; i++){
                    options +="<option value='"+resultado[i].id+"'>"+resultado[i].name+"</option>"
                }
                $("#doctor").append(options)
                console.log(resultado)
            }
        });
}

function cargarDatosSelectCliente(){
    $.ajax({    
            url : 'http://129.151.123.56:8080/api/Client/all',
            type : 'GET',
            dataType : 'JSON',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            success : function(resultado) {
                $("#client").empty();
                options = ""
                options += "<option value='' selected>Seleccione cliente</option>"
                for(i = 0;  i < resultado.length; i++){
                    options +="<option value='"+resultado[i].idClient+"'>"+resultado[i].name+"</option>"
                }
                $("#client").append(options)
                console.log(resultado)
            }
        });
}

function validarCampo(campo){
    if(campo.val() != "")
        return true
    else
        return false;
}

function limpiarFormulario(){
    $("#messagetext").val("");
    $("#id").val("");
}