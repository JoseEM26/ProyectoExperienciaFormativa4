package Instituto.CompuTronica.Services;

import Instituto.CompuTronica.DTO.GraficoDTO;
import Instituto.CompuTronica.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private AsignaturaRepository asignaturaRepository;
    @Autowired private CalificacionesRepository calificacionRepository;
    @Autowired private ChatMessageRepository chatRepository;

    private List<GraficoDTO> convertirAListaDTO(List<Object[]> data) {
        List<GraficoDTO> lista = new ArrayList<>();
        for (Object[] fila : data) {
            lista.add(new GraficoDTO(fila[0].toString(), Double.parseDouble(fila[1].toString())));
        }
        return lista;
    }

    public List<GraficoDTO> usuariosPorTipo() {
        return convertirAListaDTO(usuarioRepository.countUsuariosPorTipo());
    }

    public List<GraficoDTO> usuariosPorEstado() {
        return convertirAListaDTO(usuarioRepository.countUsuariosPorEstado());
    }

    public List<GraficoDTO> asignaturasPorProfesor() {
        return convertirAListaDTO(asignaturaRepository.countAsignaturasPorProfesor());
    }

    public List<GraficoDTO> promedioPorAsignatura() {
        return convertirAListaDTO(calificacionRepository.promedioNotasPorAsignatura());
    }

    public List<GraficoDTO> promedioPorEvaluacion() {
        return convertirAListaDTO(calificacionRepository.promedioPorEvaluacion());
    }

    public List<GraficoDTO> mensajesPorHora() {
        return convertirAListaDTO(chatRepository.mensajesPorHora());
    }
}
