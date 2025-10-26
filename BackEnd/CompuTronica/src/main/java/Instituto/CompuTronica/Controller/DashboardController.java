package Instituto.CompuTronica.Controller;

import Instituto.CompuTronica.DTO.GraficoDTO;
import Instituto.CompuTronica.Services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")

public class DashboardController {


    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/usuarios-tipo")
    public List<GraficoDTO> getUsuariosPorTipo() {
        return dashboardService.usuariosPorTipo();
    }

    @GetMapping("/usuarios-estado")
    public List<GraficoDTO> getUsuariosPorEstado() {
        return dashboardService.usuariosPorEstado();
    }

    @GetMapping("/asignaturas-profesor")
    public List<GraficoDTO> getAsignaturasPorProfesor() {
        return dashboardService.asignaturasPorProfesor();
    }

    @GetMapping("/promedio-asignatura")
    public List<GraficoDTO> getPromedioPorAsignatura() {
        return dashboardService.promedioPorAsignatura();
    }

    @GetMapping("/promedio-evaluacion")
    public List<GraficoDTO> getPromedioPorEvaluacion() {
        return dashboardService.promedioPorEvaluacion();
    }

    @GetMapping("/mensajes-hora")
    public List<GraficoDTO> getMensajesPorHora() {
        return dashboardService.mensajesPorHora();
    }
}
