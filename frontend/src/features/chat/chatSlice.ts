import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
    room: any | null;
    messages: any[];
    unreadMessages: any[];
    rooms: any[];
    onlineUsers: any[];
    favorites: any[];
    refreshMeetings: number | null;
    typing: any;
}

const initialState: ChatState = {
    room: null,
    messages: [],
    unreadMessages: [],
    rooms: [],
    onlineUsers: [],
    favorites: [],
    refreshMeetings: null,
    typing: {},
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setRoom: (state, action: PayloadAction<any>) => {
            state.room = action.payload;
        },
        setMessages: (state, action: PayloadAction<any[]>) => {
            state.messages = action.payload;
        },
        addMessage: (state, action: PayloadAction<any>) => {
            state.messages.push(action.payload);
        },
        addUnreadMessage: (state, action: PayloadAction<any>) => {
            state.unreadMessages.push(action.payload);
        },
        moreMessages: (state, action: PayloadAction<any[]>) => {
            state.messages = [...action.payload, ...state.messages];
        },
        setRooms: (state, action: PayloadAction<any[]>) => {
            state.rooms = action.payload;
        },
        setOnlineUsers: (state, action: PayloadAction<any[]>) => {
            state.onlineUsers = action.payload;
        },
        setFavorites: (state, action: PayloadAction<any[]>) => {
            state.favorites = action.payload;
        },
        setRefreshMeetings: (state, action: PayloadAction<number>) => {
            state.refreshMeetings = action.payload;
        },
        setTyping: (
            state,
            action: PayloadAction<{
                room: string;
                userId: string;
                isTyping: boolean;
            }>
        ) => {
            const { room, userId, isTyping } = action.payload;
            if (!state.typing[room]) state.typing[room] = [];

            if (isTyping) {
                if (!state.typing[room].includes(userId)) {
                    state.typing[room].push(userId);
                }
            } else {
                state.typing[room] = state.typing[room].filter(
                    (id) => id !== userId
                );
            }
        },
    },
});

export const {
    setRoom,
    setMessages,
    addUnreadMessage,
    addMessage,
    moreMessages,
    setRooms,
    setOnlineUsers,
    setFavorites,
    setRefreshMeetings,
    setTyping,
} = chatSlice.actions;

export default chatSlice.reducer;
