import GlobalEvent from "./GlobalEvent";
import { COMMONS_SUBSCRIBES } from "./constants";
class LoadingService {
  static show(message = "") {
    GlobalEvent.send(COMMONS_SUBSCRIBES.loading, {
      message,
      show: true,
    });
  }

  static hide() {
    GlobalEvent.send(COMMONS_SUBSCRIBES.loading, {
      show: false,
    });
  } 
}


export default LoadingService;
