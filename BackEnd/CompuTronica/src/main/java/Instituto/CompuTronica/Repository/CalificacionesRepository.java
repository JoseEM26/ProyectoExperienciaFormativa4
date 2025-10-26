package Instituto.CompuTronica.Repository;

import Instituto.CompuTronica.Model.Asignaturas;
import Instituto.CompuTronica.Model.Calificaciones;
import Instituto.CompuTronica.Model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CalificacionesRepository extends JpaRepository<Calificaciones, Integer> {

    List<Calificaciones> findByEstudiante(Usuarios estudiante);

    List<Calificaciones> findByAsignatura(Asignaturas asignatura);

    List<Calificaciones> findByEstudianteAndAsignatura(Usuarios estudiante, Asignaturas asignatura);

}
