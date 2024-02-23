import { obtenerUsuarios, agregarUsuario, borrarUsuario } from "./API.js";

//Variables
const listadoClientes = document.querySelector('#listado-clientes');
const formularioModal = document.querySelector('#formulario');

setTimeout(() => {
    const eliminar = document.querySelectorAll(".eliminar");
    eliminar.forEach(eliminar => {
        eliminar.addEventListener('click', (e) => {
            borrarUsuario(e.target.id);
        });
    })
}, 100);

//Eventos
document.addEventListener('DOMContentLoaded', mostrarUsuarios);
formularioModal.addEventListener('submit', (e) => {
    e.preventDefault();
    nuevoUsuario(e);
    // mostrarUsuarios();
});



async function mostrarUsuarios() {
    // console.log(listadoClientes.querySelector())
    // if(listadoClientes.childNodes == 0) {
    //     console.log('si');
    // }
    const usuarios = await obtenerUsuarios();

    usuarios.forEach(usuario => {

        const { User_id: id, User_user: email, User_password: password, User_status_name: state, Role_name: role } = usuario;

        listadoClientes.innerHTML += `
            <tr id="a${id}">
            <td data-label="Email">${email}</td>
            <td data-label="Password">${password}</td>
            <td data-label="State">${state}</td>
            <td data-label="Role">${role}</td>
            <td data-label="Acciones" class="acciones">
            <a href="#" class="eliminar" id="${id}">Eliminar</a>
            <a href="#" class="editar" id="${id}" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editUser(event, ${id})">Editar</a>
                 </td>
                 </tr>`;
    })
}

function nuevoUsuario(e) {

    const inputs = e.target.parentElement.querySelectorAll('input');

    const objUser = {};
    inputs.forEach((element, index) => {
        if (element.type !== 'submit') {
            objUser[index] = element.value;
        }
    });

    if (!Object.values(objUser).every(input => input !== '')) {
        imprimirAlerta('Debe llenar todos los campos', 'error');
    } else {
        const { 0: User_user, 1: User_password, 2: User_status_name, 3: Role_name } = objUser;
        const usuario = {
            User_user,
            User_password,
            User_status_id: 1,
            Role_id: 2
        }
        agregarUsuario(usuario);
        imprimirAlerta('Usuario agregado correctamente');
    }

}

function imprimirAlerta(mensaje, tipo) {

    const alerta = document.querySelector('.alert');

    if (!alerta) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;
        document.querySelector('.alerta').appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 2000);
    }
}


function editUser(e, id) {
    const url = new URL(window.location.href);
    url.searchParams.set('id', id);
    window.history.pushState({}, '', url);

    const tds = e.target.parentElement.parentElement.querySelectorAll('td');
    const inputs = document.querySelector('#formulario').querySelectorAll('input');
    const objUser = {}
    tds.forEach((element, index) => {
        if (!element.classList.contains('acciones')) {
            objUser[index] = element.textContent;
        }
    });
    inputs.forEach((element, index) => {
        if (element.type !== 'submit') {
            element.value = objUser[index];
        }
    });
}


function limpiartHTML() {

}
