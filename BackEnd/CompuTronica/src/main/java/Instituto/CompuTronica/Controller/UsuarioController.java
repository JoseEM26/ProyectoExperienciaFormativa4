package Instituto.CompuTronica.Controller;

import Instituto.CompuTronica.DTO.PerfilDTO;
import Instituto.CompuTronica.Model.Response;
import Instituto.CompuTronica.Model.Usuarios;
import Instituto.CompuTronica.Services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/perfil")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<Response<?>> getAllUsuarios() {
        try {
            List<Usuarios> usuarios = usuarioService.getAllUsuarios();
            return ResponseEntity.ok(Response.success(usuarios));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Response.failure("Error al obtener los usuarios: " + e.getMessage()));
        }
    }



    //PEFIL USUARIO
    @GetMapping("/codigo/{codigoInstitucional}")
    public ResponseEntity<Response<?>> getUsuariosByCodigoInstitucional(@PathVariable String codigoInstitucional) {

        Optional<Usuarios> usuarioOptional = usuarioService.getUsuariosByCodigoInstitucional(codigoInstitucional);

        if (!usuarioOptional.isPresent()) {
            return ResponseEntity.status(404).body(Response.failure("Usuario no encontrado"));
        }

        Usuarios usuario = usuarioOptional.get();
        PerfilDTO perfilDTO = new PerfilDTO();
        perfilDTO.setCodigoInstitucional(usuario.getCodigoInstitucional());
        perfilDTO.setSede(usuario.getSede());
        perfilDTO.setNombre(usuario.getNombre());
        perfilDTO.setApellido(usuario.getApellido());
        perfilDTO.setCorreoInstitucional(usuario.getCorreoInstitucional());
        perfilDTO.setTipo(usuario.getTipo());
        perfilDTO.setEstado(usuario.isEstado());

        return ResponseEntity.ok(Response.success(perfilDTO));
    }


    @PostMapping
    public ResponseEntity<Response<?>> createUsuario(@RequestBody Usuarios nuevoUsuario) {
        try {
            // Verifica si ya existe un usuario con ese código institucional
            Optional<Usuarios> existente = usuarioService.getUsuariosByCodigoInstitucional(nuevoUsuario.getCodigoInstitucional());
            if (existente.isPresent()) {
                return ResponseEntity.status(409).body(Response.failure("El usuario ya existe"));
            }

            Usuarios usuarioCreado = usuarioService.createUsuario(nuevoUsuario);
            return ResponseEntity.status(201).body(Response.success(usuarioCreado));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Response.failure("Error al crear el usuario: " + e.getMessage()));
        }
    }

}
