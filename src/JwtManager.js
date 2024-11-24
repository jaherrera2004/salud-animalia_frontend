class JwtManager {
  constructor(storageKey = "authToken") {
    this.storageKey = storageKey; // Clave para almacenar el token en localStorage o sessionStorage
  }

  /**
     * Guarda el token JWT en el almacenamiento.
     * @param {string} token - El token JWT.
     */
  saveToken(token) {
    localStorage.setItem(this.storageKey, token);
  }

  /**
     * Obtiene el token JWT desde el almacenamiento.
     * @returns {string|null} - El token JWT o null si no está presente.
     */
  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  /**
     * Elimina el token JWT del almacenamiento.
     */
  removeToken() {
    localStorage.removeItem(this.storageKey);
  }

  /**
     * Decodifica el token JWT para obtener su payload.
     * @returns {Object|null} - El payload decodificado o null si el token no es válido.
     */
  decodeToken() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  }

  /**
     * Verifica si el token JWT ha expirado.
     * @returns {boolean} - true si el token ha expirado, false de lo contrario.
     */
  isTokenExpired() {
    const decoded = this.decodeToken();
    if (!decoded || !decoded.exp) return true;

    const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    return decoded.exp < now;
  }

  /**
     * Verifica si hay un token válido almacenado.
     * @returns {boolean} - true si el token existe y no ha expirado, false de lo contrario.
     */
  isAuthenticated() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired();
  }

  /**
     * Obtiene información específica del payload del token.
     * @param {string} key - La clave del atributo que deseas obtener del payload.
     * @returns {*} - El valor asociado a la clave, o undefined si no existe.
     */
  getPayloadAttribute(key) {
    const payload = this.decodeToken();
    return payload ? payload[key] : undefined;
  }
}
export default JwtManager;
