//document.getElementById("enviar").addEventListener("click", enviar);

var inputs = document.getElementsByClassName('formulario__input');
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup', function(){
        if(this.value.length>=1){
            this.nextElementSibling.classList.add('fijar');
        }else{
            this.nextElementSibling.classList.remove('fijar');
        }
    });
}


var productos = [];

function enviar() {
    let tic=document.getElementById("ticket").value;
    let me=document.getElementById("mesa").value;
    let nam = document.getElementById('nombre').value;
    let dn=document.getElementById("dni").value;
    let pric = document.getElementById('precio').value;
    let hmuch = document.getElementById("cantidad").value;
  
    let p = parseFloat(pric);
    let hm = parseInt(hmuch);
  
   

    var objProduct = {
        ticket:tic,
        mesa:me,
        name : nam,
        dni:dn,
    }

    productos.push(objProduct);

    listar();
    document.getElementById("ticket").value="";
    document.getElementById("mesa").value="";
    document.getElementById("nombre").value = '';
    document.getElementById("dni").value="";

    let plat=document.getElementById("plato").value; 
    var objPrecio={
        plato:plat,
        precio:prec,
        cantidad:cant,
        importe:imp,
    }
   precio.push(objPrecio);
listar2();
   document.getElementById("plato").value="";
  
}

function listar(){
    let contenido = '';
    let suma = 0.0;
    for (let i = 0; i < productos.length; i++) {
        const element = productos[i];
        suma += parseFloat(element.subtotal);
        contenido = contenido + '<tr><td>' + (i+1) +'</td><td>' +element.ticket+ '</td><td>' + element.mesa+'</td><td>' + element.name + '</td><td>' + element.dni + 
        '</td><td>'+ '<img src="image/edit_filled.png" width="30px" onclick="modificar(' + i + ')">' + 
        '<img src="image/cancelar.png" width="30px" onclick="eliminar(' + i +')">' + '</td></tr>';
    }
   
    let igv = suma*0.18;
    let total = suma + igv;
    document.getElementsByTagName('tbody')[0].innerHTML = contenido;
    document.getElementById('total_sub').value = suma;
    document.getElementById('igv').value = igv;
    document.getElementById('total').value = total;
    let data = document.getElementsByTagName("td");
    alinear_tdata(data);
}

function alinear_tdata(data){
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        element.classList.add('dato');
    }
}

function eliminar(index) {
    console.log(index);
    if (confirm("Esta seguro que desea eliminar?")) {

        productos.splice(index , 1);
        listar();
    }
}

function modificar(index){
    console.log(index);
    document.getElementById("ticket").value = productos[index].ticket;
    document.getElementById("mesa").value = productos[index].mesa;
    document.getElementById("nombre").value = productos[index].nombre;
    document.getElementById("dni").value=productos[index].dni;
    document.getElementById('boton_enviar').innerHTML = '<input type="submit" value="Modificar" class="formulario__submit btn_modificar" onclick="cambiar(' + index + ')">';

}

function cambiar(index){
    let nam = document.getElementById('nombre').value;
    let pric = document.getElementById('precio').value;
    let hmuch = document.getElementById('cantidad').value;
    console.log(nam);
    console.log(pric);
    console.log(hmuch);
    let p = parseFloat(pric);
    let hm = parseInt(hmuch);
    let sub = p*hm;
    console.log(p);
    console.log(hm);
    console.log(sub);
    var objProduct = {
        name : nam,
        price : p,
        howmuch : hm,
        subtotal : sub
    }
    productos[index] = objProduct;
    listar();

    document.getElementById("nombre").value = '';
    document.getElementById("precio").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById('boton_enviar').innerHTML = '<input type="submit" class="formulario__submit" onclick="enviar()">';
}