"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import {
    ArrowLeft,
    Send,
    Image as ImageIcon,
    Mic,
    Trash2,
    MoreVertical,
    Smile,
    Paperclip,
    Edit2,
    X,
    Plus,
} from "lucide-react";
import MessageBubble from "./MessageBubble";
import dynamic from "next/dynamic";
import EmojiPicker from "emoji-picker-react";

// Dynamic import for VoiceRecorder
const VoiceRecorder = dynamic(() => import("./VoiceRecorder"), { ssr: false });

// Request notification permission on load
const requestNotificationPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
        if (Notification.permission === "default") {
            await Notification.requestPermission();
        }
    }
};

// Show browser notification
const showNotification = (title, body, icon) => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    if (Notification.permission !== "granted") return;
    if (document.hasFocus()) return; // Don't show if tab is focused

    const notification = new Notification(title, {
        body: body,
        icon: icon || "/favicon.ico",
        badge: "/favicon.ico",
        tag: "chat-message",
        renotify: true,
        silent: false,
    });

    // Play notification sound
    try {
        const audio = new Audio("/notification.mp3");
        audio.volume = 0.5;
        audio.play().catch(() => { });
    } catch (e) { }

    notification.onclick = () => {
        window.focus();
        notification.close();
    };

    // Auto close after 5 seconds
    setTimeout(() => notification.close(), 5000);
};

export default function ChatWindow({ conversation, onBack }) {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [editingMessage, setEditingMessage] = useState(null);

    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    // Ably refs
    const ablyClientRef = useRef(null);
    const channelRef = useRef(null);

    const otherParticipant = conversation?.participants?.find(
        (p) => p._id !== (user?._id || user?.id)
    );

    const [userStatus, setUserStatus] = useState({ isOnline: false, lastSeen: null });

    // Request notification permission on mount
    useEffect(() => {
        requestNotificationPermission();
    }, []);

    useEffect(() => {
        const userId = user?._id || user?.id;
        if (!conversation?._id || !userId) return;

        // Initialize Ably
        import("ably").then((Ably) => {
            const client = new Ably.Realtime({ authUrl: "/api/ably/auth" });
            ablyClientRef.current = client;

            const channel = client.channels.get(`chat:${conversation._id}`);
            channelRef.current = channel;

            // Subscribe to messages
            channel.subscribe("message", (message) => {
                const msgData = message.data;
                // Only add if not from self
                if (msgData.sender?._id !== userId) {
                    setMessages((prev) => [...prev, msgData]);
                    scrollToBottom();

                    // Show browser notification for incoming message
                    const senderName = msgData.sender?.name || "Someone";
                    const msgContent = msgData.messageType === "text"
                        ? msgData.content
                        : msgData.messageType === "image"
                            ? "📷 Sent a photo"
                            : msgData.messageType === "voice"
                                ? "🎤 Sent a voice message"
                                : "📎 Sent an attachment";

                    showNotification(
                        `New message from ${senderName}`,
                        msgContent,
                        msgData.sender?.landlordProfile?.profileImage
                    );
                }
            });

            // Subscribe to typing
            channel.subscribe("typing", (message) => {
                const data = message.data;
                if (data.userId !== userId) {
                    setIsTyping(data.isTyping);
                }
            });

            // Presence for online status
            channel.presence.enter({ name: user?.name || "User" });

            const updatePresence = async () => {
                try {
                    const members = await channel.presence.get();
                    const isOtherOnline = members.some(
                        (m) => m.clientId === otherParticipant?._id
                    );
                    setUserStatus((prev) => ({
                        ...prev,
                        isOnline: isOtherOnline,
                        lastSeen: isOtherOnline ? null : prev.lastSeen || new Date(),
                    }));
                } catch (err) {
                    console.error("Presence error:", err);
                }
            };

            channel.presence.subscribe("enter", updatePresence);
            channel.presence.subscribe("leave", (member) => {
                if (member.clientId === otherParticipant?._id) {
                    setUserStatus({ isOnline: false, lastSeen: new Date() });
                }
            });
            channel.presence.subscribe("update", updatePresence);

            updatePresence();
        });

        fetchMessages();

        return () => {
            try {
                if (channelRef.current) {
                    channelRef.current.unsubscribe();
                    // Only leave presence if channel is attached
                    if (channelRef.current.state === 'attached') {
                        channelRef.current.presence.leave().catch(() => { });
                    }
                }
                if (ablyClientRef.current) {
                    ablyClientRef.current.close();
                }
            } catch (e) {
                // Ignore cleanup errors
            }
        };
    }, [conversation?._id, user?._id, user?.id, otherParticipant?._id]);

    const formatLastSeen = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            day: "numeric",
            month: "short",
        });
    };

    const fetchMessages = async () => {
        if (!conversation?._id) return;

        try {
            const res = await fetch(
                `/api/conversations/${conversation._id}/messages`
            );
            if (res.ok) {
                const data = await res.json();
                setMessages(data.messages || []);
                setTimeout(scrollToBottom, 100);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
            setMessages([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || isSending || !conversation?._id) return;

        if (editingMessage) {
            handleEditMessage();
            return;
        }

        setIsSending(true);
        const messageText = newMessage.trim();

        setNewMessage("");
        setShowEmojiPicker(false);

        try {
            const res = await fetch(
                `/api/conversations/${conversation._id}/messages`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        messageType: "text",
                        content: messageText,
                    }),
                }
            );

            if (res.ok) {
                const data = await res.json();
                setMessages((prev) => [...prev, data.message]);
                channelRef.current?.publish("message", data.message);
                scrollToBottom();
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setNewMessage(messageText);
        } finally {
            setIsSending(false);
        }
    };

    const handleFileUpload = async (e, type = "image") => {
        const file = e.target.files?.[0];
        if (!file || !conversation?._id) return;

        if (file.size > 10 * 1024 * 1024) {
            alert("File size must be less than 10MB");
            return;
        }

        setIsSending(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("type", type === "image" ? "image" : "file");

            const uploadRes = await fetch("/api/upload/chat", {
                method: "POST",
                body: formData,
            });

            if (uploadRes.ok) {
                const { url, publicId } = await uploadRes.json();

                const messageData = {
                    messageType: type,
                    fileUrl: url,
                    filePublicId: publicId,
                };

                if (type === "file") {
                    messageData.fileName = file.name;
                    messageData.fileSize = file.size;
                }

                const res = await fetch(
                    `/api/conversations/${conversation._id}/messages`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(messageData),
                    }
                );

                if (res.ok) {
                    const data = await res.json();
                    setMessages((prev) => [...prev, data.message]);
                    channelRef.current?.publish("message", data.message);
                    scrollToBottom();
                }
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file");
        } finally {
            setIsSending(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
            if (docInputRef.current) docInputRef.current.value = "";
        }
    };

    const handleVoiceSent = async (audioBlob, duration) => {
        if (!conversation?._id) return;

        setIsSending(true);

        try {
            const formData = new FormData();
            formData.append("file", audioBlob, "voice.webm");
            formData.append("type", "voice");

            const uploadRes = await fetch("/api/upload/chat", {
                method: "POST",
                body: formData,
            });

            if (uploadRes.ok) {
                const { url, publicId } = await uploadRes.json();

                const res = await fetch(
                    `/api/conversations/${conversation._id}/messages`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            messageType: "voice",
                            fileUrl: url,
                            filePublicId: publicId,
                            duration,
                        }),
                    }
                );

                if (res.ok) {
                    const data = await res.json();
                    setMessages((prev) => [...prev, data.message]);
                    channelRef.current?.publish("message", data.message);
                    scrollToBottom();
                }
            }
        } catch (error) {
            console.error("Error sending voice message:", error);
            alert("Failed to send voice message");
        } finally {
            setIsSending(false);
        }
    };

    const handleDeleteChat = async () => {
        if (!confirm("Delete this entire chat? This cannot be undone.")) return;
        if (!conversation?._id) return;

        try {
            const res = await fetch(
                `/api/conversations/${conversation._id}/delete`,
                { method: "DELETE" }
            );

            if (res.ok) {
                onBack();
            }
        } catch (error) {
            console.error("Error deleting chat:", error);
            alert("Failed to delete chat");
        }
    };

    const handleEditMessage = async () => {
        if (!editingMessage || !newMessage.trim()) return;

        try {
            const res = await fetch(`/api/messages/${editingMessage._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: newMessage.trim() }),
            });

            if (res.ok) {
                const { message } = await res.json();
                setMessages((prev) =>
                    prev.map((m) => (m._id === message._id ? message : m))
                );
                setEditingMessage(null);
                setNewMessage("");
            }
        } catch (error) {
            console.error("Error editing message:", error);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        if (!confirm("Delete this message for everyone?")) return;
        try {
            const res = await fetch(`/api/messages/${messageId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ deleteForEveryone: true })
            });

            if (res.ok) {
                setMessages((prev) => prev.filter((m) => m._id !== messageId));
            }
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    };

    const handleReaction = async (messageId, emoji) => {
        try {
            const res = await fetch(`/api/messages/${messageId}/react`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emoji }),
            });

            if (res.ok) {
                const { message } = await res.json();
                setMessages((prev) =>
                    prev.map((m) => (m._id === message._id ? message : m))
                );
            }
        } catch (error) {
            console.error("Error reacting:", error);
        }
    };

    const handleTyping = () => {
        const userId = user?._id || user?.id;
        channelRef.current?.publish("typing", { userId, isTyping: true });

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            channelRef.current?.publish("typing", { userId, isTyping: false });
        }, 1000);
    };

    const startEditing = (message) => {
        setEditingMessage(message);
        setNewMessage(message.content);
        textareaRef.current?.focus();
    };

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden font-nunito">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 
                border-b border-gray-100 bg-white">

                <div className="flex items-center gap-3 min-w-0">
                    <button
                        onClick={onBack}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Avatar */}
                    {otherParticipant?.landlordProfile?.profileImage ? (
                        <img
                            src={otherParticipant.landlordProfile.profileImage}
                            alt={otherParticipant.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="font-semibold text-gray-700">
                                {(otherParticipant?.name || "U")[0]}
                            </span>
                        </div>
                    )}

                    {/* Name + Status */}
                    <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 truncate font-raleway">
                            {otherParticipant?.name || "Unknown User"}
                        </h3>

                        <div className="flex items-center font-nunito">
                            <span className="text-xs text-gray-500">
                                {userStatus.isOnline
                                    ? "Online"
                                    : userStatus.lastSeen
                                        ? `Last seen ${formatLastSeen(userStatus.lastSeen)}`
                                        : "Offline"}
                            </span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <div className="relative">
                        {/* Trigger Button */}
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="
      p-2 rounded-full
      text-gray-800
      hover:bg-white/15
      active:scale-95
      transition-all duration-150
      focus:outline-none focus:ring-2 focus:ring-white/40
    "
                            aria-label="Chat options"
                        >
                            <MoreVertical className="w-5 h-5" />
                        </button>

                        {showMenu && (
                            <>
                                {/* Backdrop */}
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowMenu(false)}
                                />

                                {/* Dropdown */}
                                <div
                                    className="
          absolute right-0 mt-2
          w-48
          bg-white
          rounded-xl
          border border-gray-200/80
          shadow-[0_10px_40px_rgba(0,0,0,0.12)]
          backdrop-blur-xl
          py-2
          z-50
          animate-fadeIn
        "
                                >
                                    {/* Delete Option */}
                                    <button
                                        onClick={handleDeleteChat}
                                        className="
            w-full flex items-center gap-3
            px-4 py-2.5
            text-sm font-medium
            text-red-600
            hover:bg-red-50
            active:bg-red-100
            transition-colors duration-150
          "
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span>Delete Chat</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                </button>
            </div>


            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-5 py-6 bg-gray-50 space-y-4">

                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent shadow-lg"></div>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6 animate-fadeIn">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-4 shadow-lg">
                            <Send className="w-12 h-12 text-blue-600" />
                        </div>
                        <p className="text-base font-semibold text-gray-800 mb-2">
                            No messages yet
                        </p>
                        <p className="text-sm text-gray-500 text-center">
                            Start the conversation!
                        </p>
                    </div>
                ) : (
                    <>
                        {messages.map((message) => (
                            <MessageBubble
                                key={message._id}
                                message={message}
                                isOwn={message.sender?._id === (user?._id || user?.id)}
                                onEdit={(msg) => startEditing(msg)}
                                onDelete={(msg) => handleDeleteMessage(msg._id)}
                            />
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-gray-200 px-4 py-2 rounded-2xl text-xs text-gray-500 flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>
            {/* Input Area */}
            <div className="relative bg-white border-t border-gray-200 z-20">

                {/* Editing Indicator */}
                {editingMessage && (
                    <div className="flex items-center justify-between px-4 py-2 bg-blue-50 border-b border-blue-100 text-sm">
                        <div className="flex items-center gap-2 text-blue-700 font-medium">
                            <Edit2 className="w-4 h-4" />
                            Editing message
                        </div>
                        <button
                            onClick={() => {
                                setEditingMessage(null);
                                setNewMessage("");
                                if (textareaRef.current) textareaRef.current.style.height = "auto";
                            }}
                            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Emoji Picker */}
                {showEmojiPicker && (
                    <div className="absolute bottom-16 right-4 z-50 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden bg-white">
                        <EmojiPicker
                            onEmojiClick={(emojiData) => {
                                setNewMessage((prev) => prev + emojiData.emoji);
                                setShowEmojiPicker(false);
                            }}
                            width={320}
                            height={400}
                        />
                    </div>
                )}

                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileUpload(e, "image")}
                    accept="image/*"
                    className="hidden"
                />

                {/* MAIN ROW */}
                <div className="flex items-center gap-3 px-4 py-3">

                    {/* Input Container */}
                    <div className="flex items-center flex-1 bg-gray-100 rounded-full px-4 h-11 focus-within:ring-2 focus-within:ring-blue-500 transition">

                        <textarea
                            ref={textareaRef}
                            rows={1}
                            value={newMessage}
                            onChange={(e) => {
                                setNewMessage(e.target.value);
                                e.target.style.height = "auto";
                                e.target.style.height =
                                    Math.min(e.target.scrollHeight, 120) + "px";
                                handleTyping();
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    if (newMessage.trim() && !isSending) {
                                        handleSendMessage(e);
                                        e.target.style.height = "auto";
                                    }
                                }
                            }}
                            placeholder={editingMessage ? "Edit message..." : "Type a message"}
                            disabled={isSending}
                            className="flex-1 font-nunito bg-transparent resize-none outline-none text-sm leading-normal text-gray-800 placeholder:text-gray-400 max-h-32 py-2"
                        />

                        {/* Icons */}
                        <div className="flex items-center gap-1">

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition"
                            >
                                <ImageIcon className="w-5 h-5" />
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition"
                            >
                                <Smile className="w-5 h-5" />
                            </button>

                        </div>
                    </div>

                    {/* Send / Mic */}
                    {newMessage.trim() === "" && !editingMessage ? (
                        <button
                            type="button"
                            onClick={() => setShowVoiceRecorder(true)}
                            disabled={isSending}
                            className="flex items-center justify-center w-11 h-11 rounded-full text-gray-500 hover:bg-gray-100 transition disabled:opacity-50"
                        >
                            <Mic className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            onClick={(e) => {
                                handleSendMessage(e);
                                if (textareaRef.current) textareaRef.current.style.height = "auto";
                            }}
                            disabled={!newMessage.trim() || isSending}
                            className="flex items-center justify-center w-11 h-11 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSending ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : editingMessage ? (
                                <Edit2 className="w-5 h-5" />
                            ) : (
                                <Send className="w-5 h-5" />
                            )}
                        </button>
                    )}

                </div>
            </div>



            {/* Voice Recorder Modal */}
            {showVoiceRecorder && (
                <VoiceRecorder
                    onClose={() => setShowVoiceRecorder(false)}
                    onSend={handleVoiceSent}
                />
            )}
        </div>
    );
}
