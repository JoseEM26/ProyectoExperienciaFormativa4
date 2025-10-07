package Instituto.CompuTronica.Repository;

import Instituto.CompuTronica.Model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuarios, Integer> {
    Optional<Usuarios> findByCodigoInstitucional(String codigoInstitucional);
}
