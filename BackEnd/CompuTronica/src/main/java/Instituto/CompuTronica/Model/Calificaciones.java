package Instituto.CompuTronica.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Id;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "calificaciones")
public class Calificaciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "estudiante_id", nullable = false)
    private Usuarios estudiante;  // Relación con estudiantes

    @ManyToOne
    @JoinColumn(name = "asignatura_id", nullable = false)
    private Asignaturas asignatura; // Relación con asignaturas

    @Column(nullable = false, length = 10)
    private String evaluacion; // "Parcial" o "Final"

    @Column(nullable = false, precision = 4, scale = 2)
    private BigDecimal nota;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro = LocalDateTime.now(); // Fecha de registro automática

}
