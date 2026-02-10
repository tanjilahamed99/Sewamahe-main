import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../auth/authSlice";

export interface CallState {
  status: "idle" | "ringing" | "calling" | "in-call" | "ended";
  roomId: string | null;
  token: string | null;
  caller: User | null; // user object
  callee: User | null; // user object
  type: "audio" | "video" | null;
  incoming: boolean; // true = incoming call
  callStartTime: Date | null;
  callDuration: number;
}

const initialState: CallState = {
  status: "idle",
  roomId: null,
  token: null,
  caller: null,
  callee: null,
  type: null,
  incoming: false,
  callDuration: 0,
  callStartTime: null,
};

export const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    incomingCall(state, action: PayloadAction<any>) {
      state.status = "ringing";
      state.roomId = action.payload.roomID;
      state.type = action.payload.type;
      state.caller = action.payload.caller;
      state.callee = action.payload.callee;
      state.incoming = true;
      state.token = action.payload.token;
    },
    outgoingCall(state, action: PayloadAction<any>) {
      state.status = "calling";
      state.roomId = action.payload.roomId;
      state.type = action.payload.type;
      state.caller = action.payload.caller;
      state.callee = action.payload.callee;
      state.incoming = false;
    },
    setCallToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    callAccepted(state) {
      state.status = "in-call";
      state.callStartTime = new Date();
    },
    callEnded(state) {
      Object.assign(state, initialState);
      state.callStartTime = null;
    },
  },
});

export const {
  incomingCall,
  outgoingCall,
  setCallToken,
  callAccepted,
  callEnded,
} = callSlice.actions;

export default callSlice.reducer;
