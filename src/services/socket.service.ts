import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const stompClient = Stomp.over(
  () =>
    new SockJS("http://34.142.174.8:8081/api/socket")
);

stompClient.reconnect_delay = 5000;

export default stompClient;
