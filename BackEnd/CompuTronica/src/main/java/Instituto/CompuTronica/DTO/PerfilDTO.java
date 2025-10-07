package Instituto.CompuTronica.DTO;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PerfilDTO {

    private String codigoInstitucional;

    private String sede;

    private String correoInstitucional;

    private String nombre;

    private String apellido;

    private String tipo;

    private boolean estado =true;
}
