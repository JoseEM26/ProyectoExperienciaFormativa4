package Instituto.CompuTronica.Controller;

import Instituto.CompuTronica.DTO.PerfilDTO;
import Instituto.CompuTronica.Model.Response;
import Instituto.CompuTronica.Model.Usuarios;
import Instituto.CompuTronica.Services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/perfil")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

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
}
