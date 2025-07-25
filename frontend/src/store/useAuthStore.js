import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3300";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({authUser: res.data.user});

      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({authUser: null});
    } finally {
      set({isCheckingAuth: false});
    }
  },

  signup: async (data) => {
    set({isSigningUp: true});
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({authUser: res.data.user})
      toast.success(res.data.message);

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({isSigningUp: false});
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({authUser: null});
      toast.success(res.data.message);

      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  login: async (data) => {
    set({isLoggingIn: true})
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({authUser: res.data.user});
      toast.success(res.data.message);

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({isLoggingIn: false})
    }
  },

  updateProfile: async (data) => {
    set({isUpdatingProfile: true})
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({authUser: res.data.user});
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({isUpdatingProfile: false});
    }
  },

  connectSocket : () => {
    const {authUser} = get();
    if(!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      }
    });
    socket.connect();

    set({socket: socket});

    socket.on("getOnlineUsers", (usersIds) => {
      set({onlineUsers: usersIds});
    })
  },

  disconnectSocket : () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

}));