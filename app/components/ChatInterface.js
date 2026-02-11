"use client";

import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { Send } from "lucide-react";

let socket;

export default function ChatInterface({ bookingId, userName, userId }) {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [connected, setConnected] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Initialize Socket connection
        socket = io(); // Connects to the same host/port

        socket.on("connect", () => {
            console.log("Connected to Socket.IO server");
            setConnected(true);

            // Join the specific room for this booking
            socket.emit("join-room", bookingId);
        });

        socket.on("receive-message", (msg) => {
            setChat((prev) => [...prev, msg]);
        });

        // Cleanup on unmount
        return () => {
            if (socket) socket.disconnect();
        };
    }, [bookingId]);

    // Auto-scroll to bottom when chat updates
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Send message to server
        socket.emit("send-message", {
            bookingId,
            message,
            // In a real app, you might also send userId/userName here
            // But server usually attaches the socket.id or user session
        });

        setMessage("");
    };

    return (
        <div className="flex flex-col h-[520px] w-full max-w-md 
                bg-white border border-gray-200 
                rounded-2xl shadow-xl overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 
                border-b border-gray-100 bg-white">

                <div>
                    <h3 className="text-base font-semibold text-gray-900">
                        Live Chat
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`w-2 h-2 rounded-full ${connected ? "bg-green-500" : "bg-gray-400"
                            }`} />
                        <span className="text-xs text-gray-500">
                            {connected ? "Online" : "Connecting..."}
                        </span>
                    </div>
                </div>
            </div>


            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5 bg-gray-50">
                {chat.length === 0 && (
                    <p className="text-gray-400 text-center text-sm">
                        No messages yet. Start the conversation.
                    </p>
                )}

                {chat.map((msg, index) => {
                    const isMyMessage = msg.senderId === socket.id;

                    return (
                        <div
                            key={index}
                            className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed
                        rounded-2xl 
                        ${isMyMessage
                                        ? "bg-blue-600 text-white rounded-br-md"
                                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                                    }`}
                            >
                                <p>{msg.message}</p>

                                <span className={`block mt-2 text-[11px] ${isMyMessage ? "text-blue-100" : "text-gray-400"
                                    }`}>
                                    {new Date(msg.timestamp).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>
                        </div>
                    );
                })}

                <div ref={messagesEndRef} />
            </div>


            {/* Input Area */}
            <form
                onSubmit={sendMessage}
                className="px-4 py-4 border-t border-gray-100 bg-white flex items-center gap-3"
            >
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-100 text-sm 
                   rounded-full px-4 py-2.5 
                   outline-none 
                   focus:bg-white 
                   focus:ring-2 focus:ring-blue-500 
                   transition-all"
                />

                <button
                    type="submit"
                    disabled={!message.trim() || !connected}
                    className="h-10 w-10 flex items-center justify-center
                   rounded-full bg-blue-600 text-white
                   hover:bg-blue-700 
                   disabled:opacity-40 disabled:cursor-not-allowed
                   transition"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>

        </div>
    );
}
