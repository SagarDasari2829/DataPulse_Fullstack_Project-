const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  API_BASE_URL.replace(/^http/i, "ws").replace(/\/$/, "") + "/ws";

let socket;
const listeners = new Set();
let reconnectTimer;
let reconnectAttempts = 0;
let shouldReconnect = true;
let lifecycleHandlers = {};

const notifyListeners = (message) => {
  listeners.forEach((listener) => listener(message));
};

const clearReconnectTimer = () => {
  if (reconnectTimer) {
    window.clearTimeout(reconnectTimer);
    reconnectTimer = undefined;
  }
};

const scheduleReconnect = () => {
  clearReconnectTimer();

  const delay = Math.min(1000 * 2 ** reconnectAttempts, 8000);
  reconnectAttempts += 1;

  reconnectTimer = window.setTimeout(() => {
    connectSocket(lifecycleHandlers);
  }, delay);
};

export const connectSocket = ({ onOpen, onClose, onError, onMessage } = {}) => {
  lifecycleHandlers = { onOpen, onClose, onError, onMessage };
  shouldReconnect = true;

  if (socket && socket.readyState === WebSocket.OPEN) {
    return socket;
  }

  if (socket && socket.readyState === WebSocket.CONNECTING) {
    return socket;
  }

  socket = new WebSocket(SOCKET_URL);

  socket.addEventListener("open", () => {
    clearReconnectTimer();
    reconnectAttempts = 0;
    if (onOpen) {
      onOpen();
    }
  });

  socket.addEventListener("close", () => {
    if (onClose) {
      onClose();
    }

    socket = undefined;

    if (shouldReconnect) {
      scheduleReconnect();
    }
  });

  socket.addEventListener("error", () => {
    if (onError) {
      onError();
    }
  });

  socket.addEventListener("message", (event) => {
    try {
      const parsedMessage = JSON.parse(event.data);
      if (onMessage) {
        onMessage(parsedMessage);
      }
      notifyListeners(parsedMessage);
    } catch (error) {
      const invalidMessage = {
        type: "error",
        message: "Received an invalid WebSocket response.",
      };

      if (onMessage) {
        onMessage(invalidMessage);
      }

      notifyListeners(invalidMessage);
    }
  });

  return socket;
};

export const subscribeToSocket = (listener) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const sendSearchQuery = (query) => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    return false;
  }

  socket.send(
    JSON.stringify({
      query,
    })
  );

  return true;
};

export const disconnectSocket = () => {
  shouldReconnect = false;
  clearReconnectTimer();

  if (!socket) {
    return;
  }

  socket.close();
  socket = undefined;
};
