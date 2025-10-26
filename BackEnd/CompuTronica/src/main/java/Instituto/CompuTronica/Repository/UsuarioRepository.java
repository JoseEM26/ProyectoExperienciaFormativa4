package Instituto.CompuTronica.Repository;

import Instituto.CompuTronica.Model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuarios, Integer> {
    Optional<Usuarios> findByCodigoInstitucional(String codigoInstitucional);

    List<Usuarios> findByTipo(String rol);

    @Query("SELECT u.tipo AS etiqueta, COUNT(u) AS valor FROM Usuarios u GROUP BY u.tipo")
    List<Object[]> countUsuariosPorTipo();

    @Query("SELECT CASE WHEN u.estado = true THEN 'Activo' ELSE 'Inactivo' END AS etiqueta, COUNT(u) AS valor FROM Usuarios u GROUP BY u.estado")
    List<Object[]> countUsuariosPorEstado();
}
