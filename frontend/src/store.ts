import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import chatReducer from "@/features/chat/chatSlice";
import callReducer from "@/features/call/callSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        call: callReducer,
    },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
