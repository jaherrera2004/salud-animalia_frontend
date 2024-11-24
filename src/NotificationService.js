import { Notyf } from "notyf";
import "notyf/notyf.min.css"; // Importar los estilos de notyf

class NotificationService {
  constructor() {
    this.notyf = new Notyf({
      duration: 3000, // Duración de la notificación en milisegundos
      position: { x: "right", y: "top" }, // Posición de la notificación
      types: [
        {
          type: "success",
          background: "#34d399", // Color verde de éxito (similar al FlyonUI)
          color: "white",
          borderRadius: "50px", // Forma ovalada
          padding: "10px 20px",
          fontSize: "16px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
        },
        {
          type: "error",
          background: "#f87171", // Color rojo para el error
          color: "white",
          borderRadius: "50px", // Forma ovalada
          padding: "10px 20px",
          fontSize: "16px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
        }
      ]
    });
  }

  showSuccess(message) {
    this.notyf.success(message);
  }

  showError(message) {
    this.notyf.error(message);
  }
}

export default NotificationService;
