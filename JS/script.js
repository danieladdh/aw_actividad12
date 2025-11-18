class Movimiento{
    constructor(s,c,t){
        this.saldo=s;
        this.cantidad=c;
        this.tipo=t;
    }

    

    calcularSaldo(movimientos){
        let total=0;
        movimientos.forEach(m => {
            total+=m.cantidad;
        })
        return total;
    }

    ahorrar(){
        let movimientos=JSON.parse(localStorage.getItem("movimientos")) || [];
        this.saldo=this.calcularSaldo(movimientos);
        this.saldo+=this.cantidad;
        const movimiento={tipo: this.tipo, cantidad: this.cantidad, saldoActual: this.saldo};
        movimientos.push(movimiento);
        localStorage.setItem("movimientos", JSON.stringify(movimientos))
        mostrarHistorial();
    }

    retirar(){
        let movimientos=JSON.parse(localStorage.getItem("movimientos")) || [];
        this.saldo=this.calcularSaldo(movimientos);
        if(this.saldo<this.cantidad){
            alert("Saldo insuficiente")
        }else{
            this.saldo-=this.cantidad;
            const movimiento={tipo: this.tipo, cantidad: -this.cantidad, saldoActual: this.saldo};
            movimientos.push(movimiento);
            localStorage.setItem("movimientos", JSON.stringify(movimientos))
        }
        mostrarHistorial();
    }

   


}

let cantidad=0;
document.querySelectorAll(".dineroValido").forEach(boton => {
    boton.addEventListener("click", () => {
        cantidad+=parseFloat(boton.value);
        document.getElementById("pCantidad").innerText=`$${cantidad}.00`;
    })
})

document.getElementById("btnAhorrar").addEventListener("click", () => {
    if(cantidad <= 0){
        alert("Selecciona un billete");
        return;
    }
    let objMovimiento = new Movimiento(0, cantidad, "Ahorro");
    objMovimiento.ahorrar();
    cantidad = 0;
    document.getElementById("pCantidad").innerText="$0.00";
});

document.getElementById("btnRetirar").addEventListener("click", () => {
    cantidad=parseFloat(document.getElementById("inCantidad").value);
    if(isNaN(cantidad) || cantidad<=0){
        alert("Ingrese un valor valido");
        return;
    }
    let objMovimiento=new Movimiento(0, cantidad, "Retiro");
    objMovimiento.retirar();
    document.getElementById("inCantidad").value="";
    cantidad=0;
})

function mostrarSaldoActual() {
    let movimientos=JSON.parse(localStorage.getItem("movimientos")) || [];
    let total=0;

    movimientos.forEach(m => {
        total+=m.cantidad
    });

    document.getElementById("saldoTotal").innerText="$"+total+".00";
}

mostrarSaldoActual();

function mostrarHistorial(){
        let movimientos=JSON.parse(localStorage.getItem("movimientos")) || [];
        let html="";
        movimientos.forEach((m,index) => {
            html+=`<strong> Movimiento ${index+1} </strong> <br>
            <strong>Tipo: </strong> ${m.tipo} <br>
            <strong>Cantidad: </strong> $${m.cantidad} <br>
            <strong>Saldo actual: </strong> $${m.saldoActual}
            <hr> 
            `
        })
        document.getElementById("resumen").innerHTML=html;
        mostrarSaldoActual();
}
mostrarHistorial();