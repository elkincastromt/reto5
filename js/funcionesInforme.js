function traerInformacionInforme(){
    $.ajax({    
            url : 'http://129.151.123.56:8080/api/Reservation/report-status',
            type : 'GET',
            dataType : 'JSON',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            success : function(resultado) {
                $("#resultado").empty();
                tabla = "<center><table>"
                filas = ""
                   filas += "<tr>"
                   filas +="<td>Completadas: "+resultado.completed+"</td></tr>"
                   filas += "<tr>"
                   filas +="<td>Canceladas: "+resultado.cancelled+"</td>"
                $("#resultado").append(tabla + filas + "</tr></table></center>")
                console.log(resultado)
            }
    });

    $.ajax({    
        url : 'http://129.151.123.56:8080/api/Reservation/report-clients',
        type : 'GET',
        dataType : 'JSON',
        
        error : function(xhr, status) {
            alert('ha sucedido un problema, '+xhr.status);
        },
        success : function(resultado2) {
            $("#resultado2").empty();
            tabla2 = "<center><table border='1'><tr><th>Puesto<th>Nombre"
            filas2 = ""
            puesto = 0
            for(i = 0;  i < resultado2.length; i++){
               puesto = i+1  
               filas2 += "<tr>"
               filas2 +="<td>"+puesto+"</td>"
               filas2 +="<td>"+resultado2[i].client.name+"</td>"
            }   
            $("#resultado2").append(tabla2 + filas2 + "</tr></table></center>")
            console.log(resultado2)
        }
    });
    
}

function buscarPorFecha(dateOne, dateTwo){
    if(!validarCampo(dateOne, dateTwo))
        alert("Los campos de fecha no pueden estar vacios")
    else{
        $.ajax({    
            url : 'http://129.151.123.56:8080/api/Reservation/report-dates/'+dateOne.val()+'/'+dateTwo.val(),
            dataType : 'JSON',
            type : 'GET',
            success : function(resultado) {
                $("#resultado3").empty();
                filas = "<p>Se realizaron "+resultado.length+" reservaciones entre el "+dateOne.val()+" y el "+dateTwo.val()+"</p>"
                $("#resultado3").append(filas)
                console.log(resultado)
                limpiarFormulario()
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

function validarCampo(dateOne, dateTwo){
    if(dateOne.val() != "" && dateTwo.val() != "")
        return true
    else
        return false;
}

function limpiarFormulario(){
    $("#dateOne").val("");
    $("#dateTwo").val("");
}