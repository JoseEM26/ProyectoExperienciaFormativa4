package Instituto.CompuTronica.Controller;

import Instituto.CompuTronica.DTO.LoginDTO;
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

    // ✔️ Devolver solo la lista de usuarios, sin Response<>
    @GetMapping
    public ResponseEntity<List<Usuarios>> getAllUsuarios() {
        try {
            List<Usuarios> usuarios = usuarioService.getAllUsuarios();
            return ResponseEntity.ok(usuarios);
        } catch (Exception e) {
            return ResponseEntity.status(500).build(); // sin cuerpo
        }
    }

    // ✔️ Devolver directamente PerfilDTO
    @GetMapping("/codigo/{codigoInstitucional}")
    public ResponseEntity<PerfilDTO> getUsuariosByCodigoInstitucional(@PathVariable String codigoInstitucional) {
        Optional<Usuarios> usuarioOptional = usuarioService.getUsuariosByCodigoInstitucional(codigoInstitucional);

        if (!usuarioOptional.isPresent()) {
            return ResponseEntity.notFound().build();
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

        return ResponseEntity.ok(perfilDTO);
    }

    // ✔️ Devolver directamente el objeto creado
    @PostMapping
    public ResponseEntity<Usuarios> createUsuario(@RequestBody Usuarios nuevoUsuario) {
        try {
            Optional<Usuarios> existente = usuarioService.getUsuariosByCodigoInstitucional(nuevoUsuario.getCodigoInstitucional());
            if (existente.isPresent()) {
                return ResponseEntity.status(409).build(); // Conflicto
            }

            Usuarios usuarioCreado = usuarioService.createUsuario(nuevoUsuario);
            return ResponseEntity.status(201).body(usuarioCreado);

        } catch (Exception e) {
            return ResponseEntity.status(500).build(); // Error interno
        }
    }
    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO request) {
        Optional<Usuarios> usuarioOpt = usuarioService.login(request.getCodigoInstitucional(), request.getContrasena());

        if (!usuarioOpt.isPresent()) {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }

        Usuarios usuario = usuarioOpt.get();

        PerfilDTO perfilDTO = new PerfilDTO();
        perfilDTO.setCodigoInstitucional(usuario.getCodigoInstitucional());
        perfilDTO.setSede(usuario.getSede());
        perfilDTO.setNombre(usuario.getNombre());
        perfilDTO.setApellido(usuario.getApellido());
        perfilDTO.setCorreoInstitucional(usuario.getCorreoInstitucional());
        perfilDTO.setTipo(usuario.getTipo());
        perfilDTO.setEstado(usuario.isEstado());

        return ResponseEntity.ok(perfilDTO);
    }
}
