package Instituto.CompuTronica.Controller;

import Instituto.CompuTronica.Model.ChatMessage;
import Instituto.CompuTronica.Repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Controller
public class ChatController {

    @Autowired
    private ChatMessageRepository repository;

    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public ChatMessage send(ChatMessage message) {
        // Agregar hora actual
        String time = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        message.setTime(time);

        // Guardar mensaje en base de datos
        repository.save(message);

        return message;
    }
}
