package Instituto.CompuTronica.Repository;

import Instituto.CompuTronica.Model.Asignaturas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AsignaturaRepository extends JpaRepository<Asignaturas, Integer> {


    @Query("SELECT CONCAT(u.nombre, ' ', u.apellido) AS etiqueta, COUNT(a) AS valor " +
            "FROM asignaturas a JOIN a.profesor u " +
            "GROUP BY u.nombre, u.apellido")
    List<Object[]> countAsignaturasPorProfesor();
}
