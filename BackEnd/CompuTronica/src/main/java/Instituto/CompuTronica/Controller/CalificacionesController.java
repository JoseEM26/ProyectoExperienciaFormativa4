package Instituto.CompuTronica.Controller;

import Instituto.CompuTronica.Model.Calificaciones;
import Instituto.CompuTronica.Model.Response;
import Instituto.CompuTronica.Services.CalificacionesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/calificaciones")
public class CalificacionesController {

    @Autowired
    private CalificacionesService calificacionesService;

    // ✅ Obtener todas las calificaciones
    @GetMapping
    public ResponseEntity<Response<List<Calificaciones>>> getAllCalificaciones() {
        try {
            List<Calificaciones> calificaciones = calificacionesService.getAllCalificaciones();
            return ResponseEntity.ok(Response.success(calificaciones));
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response<Calificaciones>> getCalificacionById(@PathVariable int id) {
        return calificacionesService.getCalificacionById(id)
                .map(cal -> ResponseEntity.ok(Response.success(cal)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/estudiante/{estudianteId}")
    public ResponseEntity<Response<List<Calificaciones>>> getByEstudiante(@PathVariable int estudianteId) {
        try {
            List<Calificaciones> calificaciones = calificacionesService.getCalificacionesByEstudiante(estudianteId);
            return ResponseEntity.ok(Response.success(calificaciones));
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }


    // ✅ Crear nueva calificación
    @PostMapping
    public ResponseEntity<Response<Calificaciones>> createCalificacion(@RequestBody Calificaciones calificacion) {
        try {
            Calificaciones nuevaCalificacion = calificacionesService.createCalificacion(calificacion);
            return ResponseEntity.ok(Response.success(nuevaCalificacion));
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Response<Calificaciones>> updateCalificacion(@PathVariable int id,
                                                                       @RequestBody Calificaciones calificacion) {
        Calificaciones updated = calificacionesService.updateCalificacion(id, calificacion);
        if (updated != null) {
            return ResponseEntity.ok(Response.success(updated));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar calificación
    @DeleteMapping("/{id}")
    public ResponseEntity<Response<Void>> deleteCalificacion(@PathVariable Long id) {
        try {
            calificacionesService.deleteCalificacion(id.intValue());
            return ResponseEntity.ok(Response.success(null));
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

}
