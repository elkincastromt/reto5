function traerInformacionReservaciones(){
    $.ajax({    
            url : 'http://129.151.123.56:8080/api/Reservation/all',
            type : 'GET',
            dataType : 'JSON',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            success : function(resultado) {
                $("#resultado").empty();
                tabla = "<center><table border='1'><tr><th>ID<th>Fecha Creacion<th>Fecha Reserva<th>ID Cliente<th>Nombre Cliente<th>Correo Cliente<th>Nombre Doctor<th>Acciones"
                filas = ""
                for(i = 0;  i < resultado.length; i++){
                   filas += "<tr>"
                   filas +="<td>"+resultado[i].idReservation+"</td>"
                   filas +="<td>"+resultado[i].startDate.substr(0,10)+"</td>"
                   filas +="<td>"+resultado[i].devolutionDate.substr(0,10)+"</td>"
                   filas +="<td>"+resultado[i].client.idClient+"</td>"
                   filas +="<td>"+resultado[i].client.name+"</td>"
                   filas +="<td>"+resultado[i].client.email+"</td>"
                   filas +="<td>"+resultado[i].doctor.name+"</td>"
                   filas +="<td><button onclick='eliminarReservacion("+resultado[i].idReservation+")'>Eliminar</button>"
                   filas += "<button onclick='actualizarReservacion("+resultado[i].idReservation+")'>Actualizar</button>"
                }
                $("#resultado").append(tabla + filas+"</tr></table></center>")
                console.log(resultado)
            }
        });
}

function buscarPorIDReservaciones(id){
    if(!validarCampo(id))
        alert("Primero ingrese un dato en el campo "+id.attr("id"))
    else{
        $.ajax({    
            url : 'http://129.151.123.56:8080/api/Reservation/'+id.val(),
            dataType : 'JSON',
            type : 'GET',
            success : function(resultado) {
                tabla = "<center><table border='1'><tr><th>ID<th>Fecha Creacion<th>Fecha Reserva<th>ID Cliente<th>Nombre Cliente<th>Correo Cliente<th>Nombre Doctor<th>Accione"
                filas =""
                if(resultado){
                    console.log(resultado)
                    $("#resultado").empty();
                    filas += "<tr>"
                    filas +="<td>"+resultado.idReservation+"</td>"
                    filas +="<td>"+resultado.startDate.substr(0,10)+"</td>"
                    filas +="<td>"+resultado.devolutionDate.substr(0,10)+"</td>"
                    filas +="<td>"+resultado.client.idClient+"</td>"
                    filas +="<td>"+resultado.client.name+"</td>"
                    filas +="<td>"+resultado.client.email+"</td>"
                    filas +="<td>"+resultado.doctor.name+"</td>" 
                    filas +="<td><button onclick='eliminarReservacion("+resultado.idReservation+")'>Eliminar</button>"
                    filas += "<button onclick='actualizarReservacion("+resultado.idReservation+")'>Actualizar</button>"
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

function guardarReservacion(){ 
var datos ={ 
    startDate: Date.now(),
    devolutionDate: $("#devolutionDate").val(),
        client: {
            idClient: $("#client").val()
        },
        doctor: {
            id: $("#doctor").val()
        } 
    }

    $.ajax({    
        url : 'http://129.151.123.56:8080/api/Reservation/save',
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
            window.location.href="reservaciones.html";
        }
    });
}

function eliminarReservacion(idReservacion){    
    $.ajax({    
        url : 'http://129.151.123.56:8080/api/Reservation/'+idReservacion,
        contentType: 'application/json',
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

function actualizarReservacion(idReservacion){
    console.log(idReservacion)
    location.href="actualizarReservaciones.html?variable="+idReservacion+"";
}

function cargarDatosReservacion(id){
        $.ajax({    
            url : 'http://129.151.123.56:8080/api/Reservation/'+id,
            dataType : 'JSON',
            type : 'GET',
            success : function(resultado) {
                $("#idReservation").val(resultado.idReservation)  
                $("#devolutionDate").val(resultado.devolutionDate.substr(0,10)) 
            },
            error : function(xhr, status) {
                alert('ha sucedido un problema'+ xhr.status);
            }
        });
}

function editarReservacion(){ 
    var datos={
        idReservation:$("#idReservation").val(),
        devolutionDate:$("#devolutionDate").val()
        }

    $.ajax({    
        url : 'http://129.151.123.56:8080/api/Reservation/update',
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
            window.location.href="reservaciones.html";
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