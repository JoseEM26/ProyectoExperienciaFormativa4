package Instituto.CompuTronica.Repository;

import Instituto.CompuTronica.Model.Asignaturas;
import Instituto.CompuTronica.Model.Calificaciones;
import Instituto.CompuTronica.Model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CalificacionesRepository extends JpaRepository<Calificaciones, Integer> {

    List<Calificaciones> findByEstudiante(Usuarios estudiante);

    List<Calificaciones> findByAsignatura(Asignaturas asignatura);

    List<Calificaciones> findByEstudianteAndAsignatura(Usuarios estudiante, Asignaturas asignatura);

    @Query("SELECT a.nombre AS etiqueta, ROUND(AVG(c.nota), 2) AS valor " +
            "FROM calificaciones c JOIN c.asignatura a GROUP BY a.nombre")
    List<Object[]> promedioNotasPorAsignatura();


    @Query("SELECT c.evaluacion AS etiqueta, ROUND(AVG(c.nota), 2) AS valor " +
            "FROM calificaciones c GROUP BY c.evaluacion")
    List<Object[]> promedioPorEvaluacion();
}
