package Instituto.CompuTronica.Controller;

import Instituto.CompuTronica.Model.Asignaturas;
import Instituto.CompuTronica.Services.AsignaturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/asignaturas")
public class AsignaturaController {

    @Autowired
    private AsignaturaService asignaturaService;

    // ✅ Obtener todas las asignaturas
    @GetMapping
    public ResponseEntity<List<Asignaturas>> getAllAsignaturas() {
        try {
            List<Asignaturas> asignaturas = asignaturaService.getAllAsignaturas();
            return ResponseEntity.ok(asignaturas);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }


    // ✅ Obtener una asignatura por ID
    @GetMapping("/{id}")
    public ResponseEntity<Asignaturas> getAsignaturaById(@PathVariable int id) {
        Optional<Asignaturas> asignatura = asignaturaService.getAsignaturaById(id);
        return asignatura.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Crear una nueva asignatura
    @PostMapping
    public ResponseEntity<Asignaturas> createAsignatura(@RequestBody Asignaturas nuevaAsignatura) {
        try {
            Asignaturas asignaturaCreada = asignaturaService.createAsignatura(nuevaAsignatura);
            return ResponseEntity.status(201).body(asignaturaCreada);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // ✅ Actualizar una asignatura
    @PutMapping("/{id}")
    public ResponseEntity<Asignaturas> updateAsignatura(@PathVariable int id, @RequestBody Asignaturas asignatura) {
        Asignaturas actualizada = asignaturaService.updateAsignatura(id, asignatura);
        if (actualizada != null) {
            return ResponseEntity.ok(actualizada);
        }
        return ResponseEntity.notFound().build();
    }

    // ✅ Eliminar una asignatura
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsignatura(@PathVariable int id) {
        try {
            asignaturaService.deleteAsignatura(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

}
