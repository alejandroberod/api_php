const url = "http://localhost/api_php/app/config/db.php";

export const obtenerUsuarios = async () => {
  try {
    const resultado = await fetch(url);
    const usuarios = await resultado.json();
    return usuarios;
  } catch (error) {
    console.log(error)
  }
}

export const agregarUsuario = async (usuario) => {
  try {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(usuario),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export const borrarUsuario = async (id) => {
  try {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(id),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => console.log(data));
    //console.log(id)
  } catch (error) {
    console.log(error)
  }
}