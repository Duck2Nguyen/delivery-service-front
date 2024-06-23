import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const stompClient = Stomp.over(
  () =>
    // new SockJS("https://delivery-service-7elcupesca-uc.a.run.app/api/socket")
    new SockJS("http://localhost:8081/api/socket")
);

stompClient.reconnect_delay = 5000;

export default stompClient;
