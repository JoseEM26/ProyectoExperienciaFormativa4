package Instituto.CompuTronica.Services;

import Instituto.CompuTronica.Model.Asignaturas;
import Instituto.CompuTronica.Repository.AsignaturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AsignaturaService {

    @Autowired
    private AsignaturaRepository asignaturaRepository;

    // 1. Crear una nueva asignatura
    public Asignaturas createAsignatura(Asignaturas asignatura) {
        return asignaturaRepository.save(asignatura);
    }

    // 2. Obtener todas las asignaturas
    public List<Asignaturas> getAllAsignaturas() {
        return asignaturaRepository.findAll();
    }

    // 3. Obtener una asignatura por ID
    public Optional<Asignaturas> getAsignaturaById(int id) {
        return asignaturaRepository.findById(id);
    }

    // 4. Actualizar una asignatura
    public Asignaturas updateAsignatura(int id, Asignaturas asignatura) {
        if (asignaturaRepository.existsById(id)) {
            asignatura.setId(id);
            return asignaturaRepository.save(asignatura);
        }
        return null;
    }

    // 5. Eliminar una asignatura
    public void deleteAsignatura(int id) {
        if (asignaturaRepository.existsById(id)) {
            asignaturaRepository.deleteById(id);
        }
    }
}
