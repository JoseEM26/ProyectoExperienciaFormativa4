package Instituto.CompuTronica.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "asignaturas")
public class Asignaturas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "codigo_asignatura", nullable = false, length = 10)
    private String codigoAsignatura;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(nullable = false)
    private int creditos = 3;

    @ManyToOne
    @JoinColumn(name = "profesor_id")
    private Usuarios profesor; // Relación con la tabla Usuarios

}
