package Instituto.CompuTronica.Repository;

import Instituto.CompuTronica.Model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    @Query("SELECT c.time AS etiqueta, COUNT(c) AS valor FROM ChatMessage c GROUP BY c.time")
    List<Object[]> mensajesPorHora();
}
