import Vue from "vue";
import Vuex from "vuex";
import { ActionTree } from "vuex";
import io from "socket.io-client";
Vue.use(Vuex);

export interface AppState {
  socketIO: SocketIOClient.Socket | null;
  storeText: String;
  storeNumber: Number;
}

export const state: AppState = {
  socketIO: null,
  storeText: "",
  storeNumber: 0
};

export const mutations = {
  setStoreText(state: AppState, text: string) {
    state.storeText = text;
  },

  setStoreNumber(state: AppState, val: number) {
    state.storeNumber = val;
  }
};

export const getters = {
  getSocket: (state: AppState) => {
    return state.socketIO;
  },

  text: (state: AppState) => {
    return state.storeText;
  },

  number: (state: AppState) => {
    return state.storeNumber;
  }
};

export const actions: ActionTree<AppState, any> = {
  setupSockets(context: any, payload: any): Promise<any> {
    console.log("Setting up sockets");
    console.log(payload);

    return new Promise((resolve, reject) => {
      // if undefined, login and setup
      try {
        if (!context.state.socketIO) {
          let result = {
            isAdmin: false
          };
          console.log("Logging in with user:" + payload.username);
          let url = window.location.origin;
          if (payload.username.toLowerCase() === "admin") {
            url += "/admin";
            result.isAdmin = true;
          } else {
            url += "/broker";
          }
          context.state.socketIO = io(url);
          context.state.socketIO.on("connect", () => {
            console.log("Connected to the server");
            resolve(result);
          });
          
          if(!result.isAdmin){
            context.state.socketIO.on("update", (data: any) => {
              console.log("Event happening");
              console.log(data);                              
              context.commit('setStoreText', data.storeText);
              context.commit('setStoreNumber', data.storeNumber);
              
            });
          }
        }
      } catch (err) {
        reject(err);
      }
    });
  },

  disconnectSocket(context: any) {
    context.state.socketIO.close();
    setTimeout(() => {
      context.state.socketIO = null;
    }, 2000);
  },

  randomAdminChange(context: any) {
    (context.state.socketIO as SocketIOClient.Socket).emit("randomChange");
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
