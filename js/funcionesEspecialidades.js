function traerInformacionEspecialidades(){
    $.ajax({    
            url : 'http://129.151.123.56:8080/api/Specialty/all',
            type : 'GET',
            dataType : 'JSON',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            success : function(resultado) {
                $("#resultado").empty();
                tabla = "<center><table border='1'><tr><th>ID<th>Nombre<th>Descripcion<th>Acciones"
                filas = ""
                for(i = 0;  i < resultado.length; i++){
                   filas += "<tr>"
                   filas +="<td>"+resultado[i].id+"</td>"   
                   filas +="<td>"+resultado[i].name+"</td>"
                   filas +="<td>"+resultado[i].description+"</td>"
                   filas +="<td><button onclick='eliminarEspecialidad("+resultado[i].id+")'>Eliminar</button>"
                   filas += "<button onclick='actualizarEspecialidad("+resultado[i].id+")'>Actualizar</button>"
                }
                $("#resultado").append(tabla + filas+"</tr></table></center>")
                console.log(resultado)
            }
        });
}

function buscarPorIDEspecialidades(id){
    if(!validarCampo(id))
        alert("Primero ingrese un dato en el campo "+id.attr("id"))
    else{
        $.ajax({    
            url : 'http://129.151.123.56:8080/api/Specialty/'+id.val(),
            type : 'GET',
            dataType : 'JSON',
            success : function(resultado) {
                tabla = "<center><table border='1'><tr><th>ID<th>Nombre<th>Descripcion<th>Acciones"
                filas =""
                console.log(resultado)
                if(resultado){
                    console.log(resultado)
                    $("#resultado").empty();
                    filas += "<tr>"
                    filas +="<td>"+resultado.id+"</td>" 
                    filas +="<td>"+resultado.name+"</td>"
                    filas +="<td>"+resultado.description+"</td>"
                    filas +="<td><button onclick='eliminarEspecialidad("+resultado.id+")'>Eliminar</button>"
                    filas += "<button onclick='actualizarEspecialidad("+resultado.id+")'>Actualizar</button>"
                    $("#resultado").append(tabla + filas+"</tr></table></center>")  
                }
                else{
                    alert("Specialty con ID "+id.val()+" no existe")
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

function guardarEspecialidad(){ 
var datos={ 
    name: $("#name").val(),
    description: $("#description").val()
    }
    $.ajax({    
        url : 'http://129.151.123.56:8080/api/Specialty/save',
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
            window.location.href="especialidades.html";
        }
    });
}

function eliminarEspecialidad(idSpecialty){    
var id = idSpecialty  
console.log(idSpecialty)  
    $.ajax({    
        url : 'http://129.151.123.56:8080/api/Specialty/'+id,
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

function actualizarEspecialidad(idSpecialty){
    console.log(idSpecialty)
    location.href="actualizarEspecialidades.html?variable="+idSpecialty+"";
}

function cargarDatosEspecialidad(id){
    $.ajax({    
        url : 'http://129.151.123.56:8080/api/Specialty/'+id,
        dataType : 'JSON',
        type : 'GET',
        success : function(resultado) {
            $("#id").val(resultado.id)  
            $("#name").val(resultado.name)
            $("#description").val(resultado.description)
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema'+ xhr.status);
        }
    });
}

function editarEspecialidad(){ 
var datos={
        id:$("#id").val(),
        name: $("#name").val(),
        description: $("#description").val()
    }

$.ajax({    
    url : 'http://129.151.123.56:8080/api/Specialty/update',
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
        window.location.href="especialidades.html";
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
    $("#specialty").val("");
    $("#year").val("");
    $("#department_id").val("");
    $("#name").val("");
}