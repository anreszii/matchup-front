import version from '@/constants/version';
import { REACT_APP_WS_URL } from '@env';

class WSClient {
  constructor(url, tokenData) {
    this.token = '';
    this.observers = {};
    // не убирайте эту строку, без неё не работает приложение, пожалуйста - спасибо
    this.socket = new WebSocket('wss://barakobama.online:81/client');
    this.socket.binaryType = 'blob';
    this.isOpened = false;
    this.stack = [];

    this.initEvents();
  }

  initEvents() {
    this.socket.addEventListener('open', (event) => {
      this.isOpened = true;
      console.log('openned');
      if (this.token) {
        console.log('token existing');
        this.send('authorize');
        this.sendStack();
      }
    });
    this.socket.addEventListener('message', (event) => {
      const fr = new FileReader();

      fr.onload = (e) => {
        const { event, used } = JSON.parse(e.target.result);
        this.attachObserver(event, used[0]);
      };

      fr.readAsText(event.data);
      this.socket.removeEventListener('message');
    });
    this.socket.addEventListener('close', (event) => {
      console.log('on close', event);
    });

    this.socket.addEventListener('error', (event) => {
      console.log('on error', event);
    });
  }
  listenSocket(callback) {
    this.socket.addEventListener('message', (event) => {
      const fr = new FileReader();
      fr.onload = (e) => {
        const { event, used } = JSON.parse(e.target.result);
        let label = JSON.parse(used[0]).label;
        if (label === 'unknown') {
          callback(label, used);
        }
        if (label === 'get_user_data') {
          if (JSON.parse(used[0]).response) {
            this.attachObserver(label, JSON.parse(used[0]).response);
            callback(label, JSON.parse(used[0]).response);
          }
        }
        if (label === 'prepare') {
          callback(label, JSON.parse(used[0]));
        }
        if (label === 'completed_tasks') {
          callback(label, JSON.parse(used[0]).response);
        }
        if (label === 'get_avi_users') {
          callback(label, JSON.parse(used[0]));
        }
        if (label === 'get_for_user') {
          callback(label, JSON.parse(used[0]).response);
        }
        if (label === 'get_avi') {
          callback(label, JSON.parse(used[0]).response);
        }
        if (label === 'validate_pass') {
          callback(label, JSON.parse(used[0]).status);
        }
        if (label === 'upload_image') {
          callback(label, JSON.parse(used[0]).response);
        }
        if (label === 'get_top_players') {
          callback(label, JSON.parse(used[0]).response);
        }
        if (label === 'get_friends') {
          callback(label, JSON.parse(used[0]).response);
        }
        if (label === 'get_subscribers') {
          callback(label, JSON.parse(used[0]).response);
        }
        if (label === 'add_friends') {
          callback(label, JSON.parse(used[0]));
        }
        if (label === 'del_request') {
          callback(label, JSON.parse(used[0]));
        }
        if (label === 'get_all_user') {
          callback(label, JSON.parse(used[0]).response);
        }
        if (label === 'get_another_user') {
          callback(label, JSON.parse(used[0]).response);
        }
        if (label === 'get_history_match') {
          callback(label, JSON.parse(used).response[0]);
        }
        if (label === 'find-lobby') {
          callback(label, JSON.parse(used[0]).response);
        }
        if (label === 'leave-lobby') {
          callback(label, JSON.parse(used[0]).response);
        }
        if (label === 'sync') {
          callback(label, JSON.parse(used[0]));
        }
        if (label === 'ready') {
          callback(label, JSON.parse(used[0]));
        }
        if (label === 'vote') {
          callback(label, JSON.parse(used[0]));
        }
        if (label === 'get_guild_data') {
          callback(label, JSON.parse(used[0]));
        }
        if (label === 'invite_to_lobby') {
          callback(label, JSON.parse(used[0]));
        }
        if (label === 'chat_history') {
          callback(label, JSON.parse(used[0]));
        }
        if (label === 'create_team') {
          callback(label, JSON.parse(used[0]));
        }
        if (label === 'invite') {
          callback(label, JSON.parse(used[0]));
        }
        if (label === 'check-team') {
          callback(label, JSON.parse(used[0]).response);
        }
        if (label === 'teams') {
          callback(label, JSON.parse(used[0]).response);
        }
        if (label === 'message') {
          callback(label, JSON.parse(used[0]));
        }
        if (label === 'sync-lobby') {
          callback(label, JSON.parse(used[0]));
        }
        if (label === 'join_team') {
          callback(label, JSON.parse(used[0]));
        }
        if (label === 'team') {
          callback(label, JSON.parse(used[0]));
        }
        if (label === 'start') {
          callback(label, JSON.parse(used[0]));
        }
        if (label === 'get_another_history_match') {
          callback(label, JSON.parse(used).response[0]);
        }
        if (label === 'get_avi_users') {
          callback(label, JSON.parse(used).response);
        }
        if (label === 'get_ava_users') {
          callback(label, JSON.parse(used).response);
        }
        if (label === 'leave_team') {
          callback(label, JSON.parse(used));
        }
        if (label === 'leave') {
          callback(label, JSON.parse(used));
        }
        if (label === 'auth') {
          callback(label, JSON.parse(used));
        }
        if (label === 'get_all_players_found') {
          callback(label, JSON.parse(used).response);
        }
      };
      fr.readAsText(event.data);
    });
  }
  disconnectSocket() {
    this.socket.removeEventListener('message');
  }
  sendSocket(event, payload) {
    this.send(event, payload);
  }

  updateToken(token) {
    this.token = token;
    this.send('authorize', { label: 'auth', version: version });
    this.sendStack();
  }

  sendStack() {
    this.stack.forEach((item) => {
      this.send(item.event, item.payload);
    });
    this.stack = [];
  }

  send(event, payload = {}) {
    if (!this.isOpened || !this.token) {
      this.stack.push({ event, payload });
      return;
    }
    this.socket.send(JSON.stringify({ event, token: this.token, ...payload }));
  }

  addEventListener(event, callback) {
    this.socket.addEventListener(event, callback);
  }

  attachObserver(event, observer) {
    if (!this.observers[event]) {
      this.observers[event] = [];
    }
    this.observers[event].push(observer);
  }

  detachObserver(event, observer) {
    if (!this.observers[event]) {
      this.observers[event] = [];
    }
    const index = this.observers[event].findIndex(
      (attachedObserver) => attachedObserver === observer
    );
    if (index !== -1) {
      this.observers[event].splice(index, 1);
    }
  }

  getObservers() {
    return this.observers;
  }
  getObserver(event) {
    if (this.observers[event]) {
      return this.observers[event];
    }
    return undefined;
  }

  notifyObservers(event, data) {
    if (this.observers[event]) {
      this.observers[event].forEach((observer) => {
        observer.update(event, data);
      });
    }
  }
}

export default new WSClient(REACT_APP_WS_URL);
