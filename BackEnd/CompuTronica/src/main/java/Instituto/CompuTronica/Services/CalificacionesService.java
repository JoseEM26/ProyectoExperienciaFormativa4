package Instituto.CompuTronica.Services;

import Instituto.CompuTronica.Model.Asignaturas;
import Instituto.CompuTronica.Model.Calificaciones;
import Instituto.CompuTronica.Model.Usuarios;
import Instituto.CompuTronica.Repository.AsignaturaRepository;
import Instituto.CompuTronica.Repository.CalificacionesRepository;
import Instituto.CompuTronica.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CalificacionesService {

    @Autowired
    private CalificacionesRepository calificacionesRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AsignaturaRepository asignaturaRepository;


    // 1. Crear una nueva calificación con validación
    public Calificaciones createCalificacion(Calificaciones calificacion) {
        // Verificar si ya existe una calificación para ese estudiante y asignatura con la misma evaluación
        List<Calificaciones> existentes = calificacionesRepository.findByEstudianteAndAsignatura(
                calificacion.getEstudiante(), calificacion.getAsignatura());

        boolean yaExiste = existentes.stream()
                .anyMatch(c -> c.getEvaluacion().equalsIgnoreCase(calificacion.getEvaluacion()));

        if (yaExiste) {
            // Si ya existe, no se guarda y se devuelve null (o lanzar una excepción)
            return null;
            // Alternativamente, puedes lanzar una excepción:
            // throw new IllegalArgumentException("Esta calificación ya fue registrada para este estudiante.");
        }

        return calificacionesRepository.save(calificacion);
    }

    // 2. Obtener todas las calificaciones
    public List<Calificaciones> getAllCalificaciones() {
        return calificacionesRepository.findAll();
    }

    // 3. Obtener calificación por ID
    public Optional<Calificaciones> getCalificacionById(int id) {
        return calificacionesRepository.findById(id);
    }

    // 4. Actualizar calificación
    public Calificaciones updateCalificacion(int id, Calificaciones calificacion) {
        if (calificacionesRepository.existsById(id)) {
            calificacion.setId(id);
            return calificacionesRepository.save(calificacion);
        }
        return null;
    }

    // 5. Eliminar calificación
    public void deleteCalificacion(int id) {
        if (calificacionesRepository.existsById(id)) {
            calificacionesRepository.deleteById(id);
        }
    }

    // 6. Obtener calificaciones por estudiante
    public List<Calificaciones> getCalificacionesByEstudiante(int estudianteId) {
        Optional<Usuarios> estudiante = usuarioRepository.findById(estudianteId);
        return estudiante.map(calificacionesRepository::findByEstudiante).orElse(List.of());
    }

    // 7. Obtener calificaciones por asignatura
    public List<Calificaciones> getCalificacionesByAsignatura(int asignaturaId) {
        Optional<Asignaturas> asignatura = asignaturaRepository.findById(asignaturaId);
        return asignatura.map(calificacionesRepository::findByAsignatura).orElse(List.of());
    }

}
