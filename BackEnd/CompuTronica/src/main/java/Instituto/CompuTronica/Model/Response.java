package Instituto.CompuTronica.Model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Response<T> {

    private boolean success;  // Indica si la operación fue exitosa
    private String message;   // Mensaje detallado
    private T data;           // Puede ser cualquier tipo de dato (usuarios, objetos, listas, etc.)

    // Constructor con solo éxito y mensaje, sin datos adicionales
    public Response(boolean success, String message) {
        this.success = success;
        this.message = message;
        this.data = null;
    }

    // Métodos estáticos para facilitar la creación de respuestas comunes
    public static <T> Response<T> success(T data) {
        return new Response<>(true, "Operación exitosa", data);
    }

    public static Response<String> failure(String message) {
        return new Response<>(false, message, null);
    }
}
