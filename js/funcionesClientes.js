function traerInformacionClientes(){
    $.ajax({    
            url : 'http://129.151.123.56:8080/api/Client/all',
            type : 'GET',
            dataType : 'JSON',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            success : function(resultado) {
                $("#resultado").empty();
                tabla = "<center><table border='1'><tr><th>ID<th>Nombre<th>Email<th>Edad<th>Acciones"
                filas = ""
                for(i = 0;  i < resultado.length; i++){
                   filas += "<tr>"
                   filas +="<td>"+resultado[i].idClient+"</td>"   
                   filas +="<td>"+resultado[i].name+"</td>" 
                   filas +="<td>"+resultado[i].email+"</td>" 
                   filas +="<td>"+resultado[i].age+"</td>" 
                   filas +="<td><button onclick='eliminarCliente("+resultado[i].idClient+")'>Eliminar</button>"
                   filas += "<button onclick='actualizarCliente("+resultado[i].idClient+")'>Actualizar</button>"
                }
                $("#resultado").append(tabla + filas+"</tr></table></center>")
                console.log(resultado)
            }
        });
}

function buscarPorIDClientes(id){
    if(!validarCampo(id))
        alert("Primero ingrese un dato en el campo "+id.attr("id"))
    else{
        $.ajax({    
            url : 'http://129.151.123.56:8080/api/Client/'+id.val(),
            dataType : 'JSON',
            type : 'GET',
            success : function(resultado) {
                tabla = "<center><table border='1'><tr><th>ID<th>Nombre<th>Email<th>Edad<th>Acciones"
                filas =""
                if(resultado){
                    console.log(resultado)
                    $("#resultado").empty();
                    filas += "<tr>"
                    filas +="<td>"+resultado.idClient+"</td>"   
                    filas +="<td>"+resultado.name+"</td>" 
                    filas +="<td>"+resultado.email+"</td>" 
                    filas +="<td>"+resultado.age+"</td>" 
                    filas +="<td><button onclick='eliminarCliente("+resultado.idClient+")'>Eliminar</button>"
                    filas += "<button onclick='actualizarCliente("+resultado.idClient+")'>Actualizar</button>"
                    $("#resultado").append(tabla + filas+"</tr></table></center>")  
                }
                else{
                    alert("Client con ID "+id.val()+" no existe")
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

function guardarCliente(){ 
var datos ={ 
        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#age").val(),
        password: $("#password").val(),
     }

    $.ajax({    
        url : 'http://129.151.123.56:8080/api/Client/save',
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
            window.location.href="clientes.html";
        }
    });
}

function eliminarCliente(idCliente){    
    $.ajax({    
        url : 'http://129.151.123.56:8080/api/Client/'+idCliente,
        dataType : 'JSON',
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

function actualizarCliente(idClient){
    console.log(idClient)
    location.href="actualizarClientes.html?variable="+idClient+"";
}

function cargarDatosCliente(id){
    $.ajax({    
        url : 'http://129.151.123.56:8080/api/Client/'+id,
        dataType : 'JSON',
        type : 'GET',
        success : function(resultado) {
            $("#idClient").val(resultado.idClient)  
            $("#name").val(resultado.name)
            $("#email").val(resultado.email)
            $("#password").val(resultado.password)
            $("#age").val(resultado.age) 
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema'+ xhr.status);
        }
    });
}

function editarCliente(){ 
var datos={
        idClient:$("#idClient").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        age: $("#age").val()
    }

$.ajax({    
    url : 'http://129.151.123.56:8080/api/Client/update',
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
        window.location.href="clientes.html";
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
    $("#name").val("");
    $("#email").val("");
    $("#age").val("");
}