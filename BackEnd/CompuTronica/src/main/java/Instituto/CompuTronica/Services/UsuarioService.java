package Instituto.CompuTronica.Services;

import Instituto.CompuTronica.Model.Usuarios;
import Instituto.CompuTronica.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // 1. Crear un nuevo usuario
    public Usuarios createUsuario(Usuarios usuario) {
        return usuarioRepository.save(usuario);
    }

    // 2. Obtener todos los usuarios
    public List<Usuarios> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    // 3. Obtener un usuario por ID
    public Optional<Usuarios> getUsuarioById(int id) {
        return usuarioRepository.findById(id);
    }

    // 4. Actualizar un usuario
    public Usuarios updateUsuario(int id, Usuarios usuario) {
        // Verificar si el usuario existe
        if (usuarioRepository.existsById(id)) {
            usuario.setId(id); // Asegurarse de que el ID del usuario sea correcto
            return usuarioRepository.save(usuario);  // Actualiza el usuario en la base de datos
        }
        return null;  // Si el usuario no existe, devolver null o lanzar excepción
    }

    // 5. Eliminar un usuario por ID
    public void deleteUsuario(int id) {
        // Verificar si el usuario existe
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);  // Elimina el usuario de la base de datos
        }
    }

    // 6. Buscar un usuario por su código institucional (opcional)
    public     Optional<Usuarios>  getUsuariosByCodigoInstitucional(String codigoInstitucional) {
        return usuarioRepository.findByCodigoInstitucional(codigoInstitucional);
    }
   // 7. Login , validar credenciales
    public Optional<Usuarios> login(String codigoInstitucional, String contrasena) {
        Optional<Usuarios> usuarioOpt = usuarioRepository.findByCodigoInstitucional(codigoInstitucional);

        if (usuarioOpt.isPresent()) {
            Usuarios usuario = usuarioOpt.get();
            if (usuario.getContrasena().equals(contrasena)) {
                return usuarioOpt;
            }
        }

        return Optional.empty();
    }
}
