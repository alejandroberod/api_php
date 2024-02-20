const url = "http://localhost/Myproject/app/config/db.php";
const urlC = "http://localhost/Myproject/app/config/crearUser.php";

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
    console.log(usuario);
  } catch (error) {
    console.log(error)
  }
}