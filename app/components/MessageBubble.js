"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FileText, Download, Image as ImageIcon, Edit2, Trash2, MoreVertical } from "lucide-react";

export default function MessageBubble({ message, isOwn, onEdit, onDelete }) {
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const longPressTimer = useRef(null);
    const menuRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const messageRef = useRef(null);

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")} `;
    };

    const reactionCounts = message.reactions?.reduce((acc, curr) => {
        acc[curr.emoji] = (acc[curr.emoji] || 0) + 1;
        return acc;
    }, {});

    // Handle long press for mobile
    const handleTouchStart = (e) => {
        if (!isOwn) return; // Only for own messages

        longPressTimer.current = setTimeout(() => {
            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }

            const touch = e.touches[0];
            setMenuPosition({ x: touch.clientX, y: touch.clientY });
            setShowMenu(true);
        }, 500); // 500ms long press
    };

    const handleTouchEnd = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
        }
    };

    // Handle right-click for desktop
    const handleContextMenu = (e) => {
        if (!isOwn) return; // Only for own messages

        e.preventDefault();
        setMenuPosition({ x: e.clientX, y: e.clientY });
        setShowMenu(true);
    };

    // Close menu when clicking outside - FIXED: Check both desktop and mobile refs
    useEffect(() => {
        const handleClickOutside = (e) => {
            // Check if click is inside the desktop menu
            const isInsideDesktopMenu = menuRef.current && menuRef.current.contains(e.target);
            // Check if click is inside the mobile bottom sheet
            const isInsideMobileMenu = mobileMenuRef.current && mobileMenuRef.current.contains(e.target);

            // Only close if click is outside BOTH menus
            if (!isInsideDesktopMenu && !isInsideMobileMenu) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            // Use a small delay to prevent immediate closure on the same touch that opened the menu
            const timeoutId = setTimeout(() => {
                document.addEventListener("mousedown", handleClickOutside);
                document.addEventListener("touchstart", handleClickOutside, { passive: false });
            }, 100);

            return () => {
                clearTimeout(timeoutId);
                document.removeEventListener("mousedown", handleClickOutside);
                document.removeEventListener("touchstart", handleClickOutside);
            };
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [showMenu]);

    const handleEdit = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setShowMenu(false);
        if (onEdit) onEdit(message);
    };

    const handleDelete = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setShowMenu(false);
        if (onDelete) onDelete(message);
    };

    // State for portal mounting
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Portal for mobile menu
    const MobileMenuPortal = ({ children }) => {
        if (!mounted || typeof window === 'undefined') return null;
        return createPortal(children, document.body);
    };

    return (
        <>
            <div
                ref={messageRef}
                className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-5 px-2 relative`}
                onContextMenu={handleContextMenu}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className={`
      relative
      max-w-[85%] sm:max-w-[75%] lg:max-w-[65%]
      rounded-2xl
      backdrop-blur-sm
      transition-all duration-200
      ${isOwn
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white text-gray-900 border border-gray-200 shadow-sm"
                        }
      ${message.messageType === "text" ? "px-4 py-3" : "p-2"}
    `}
                >

                    {/* Replied Message Context */}
                    {message.replyTo && (
                        <div
                            className={`
      mb-3 rounded-lg px-3 py-2 text-xs border-l-4
      ${isOwn
                                    ? "bg-white/10 border-white/40 text-white/90"
                                    : "bg-gray-50 border-blue-500 text-gray-600"
                                }
      opacity-95
    `}
                        >
                            <div className="font-semibold mb-0.5 truncate">
                                {message.replyTo.sender?.name ||
                                    message.replyTo.sender?.firstName ||
                                    message.replyTo.senderName ||
                                    "Someone"}
                            </div>
                            <div className="truncate opacity-80">
                                {message.replyTo.messageType === "text"
                                    ? message.replyTo.content
                                    : "Media attachment"}
                            </div>
                        </div>
                    )}


                    {/* Text Message */}
                    {message.messageType === "text" && (
                        <p className="text-sm font-nunito leading-relaxed break-words whitespace-pre-wrap tracking-[0.01em]">
                            {message.content}
                        </p>

                    )}

                    {/* Image Message */}
                    {message.messageType === "image" && (
                        <div className="rounded-xl overflow-hidden bg-gray-100">
                            <img
                                src={message.fileUrl}
                                alt="Shared image"
                                className="max-w-full h-auto cursor-pointer transition hover:opacity-95"
                                onClick={() => window.open(message.fileUrl, "_blank")}
                            />
                        </div>

                    )}

                    {/* Voice Message */}
                    {message.messageType === "voice" && (
                        <div className={`flex items-center gap-3 min-w-[220px] px-3 py-2`}>

                            <audio
                                controls
                                className="w-full rounded-lg"
                                style={{
                                    height: "36px",
                                    filter: isOwn ? "invert(1) brightness(1.2)" : "none",
                                }}
                            >
                                <source src={message.fileUrl} type="audio/webm" />
                                <source src={message.fileUrl} type="audio/ogg" />
                                Your browser does not support audio.
                            </audio>
                            {message.duration && (
                                <span className={`text-xs font-medium whitespace-nowrap ${isOwn ? "text-blue-100" : "text-gray-600"}`}>
                                    {formatDuration(message.duration)}
                                </span>
                            )}
                        </div>
                    )}

                    {/* File Attachment */}
                    {message.messageType === "file" && (
                        <a
                            href={message.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 min-w-[240px]
  ${isOwn
                                    ? "bg-white/10 hover:bg-white/20"
                                    : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                                }
`}

                        >
                            <div className={`p-3 rounded-lg ${isOwn ? "bg-white/20" : "bg-blue-50"}`}>
                                <FileText className={`w-6 h-6 ${isOwn ? "text-white" : "text-blue-600"}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-semibold truncate ${isOwn ? "text-white" : "text-gray-900"}`}>
                                    {message.fileName || "Attachment"}
                                </p>
                                <p className={`text-xs mt-0.5 ${isOwn ? "text-blue-100" : "text-gray-500"}`}>
                                    {message.fileSize ? `${(message.fileSize / 1024).toFixed(1)} KB` : "File"}
                                </p>
                            </div>
                            <Download className={`w-5 h-5 flex-shrink-0 ${isOwn ? "text-white/80" : "text-gray-400"}`} />
                        </a>
                    )}

                    {/* GIF Message */}
                    {message.messageType === "gif" && (
                        <div className="rounded-xl overflow-hidden">
                            <img
                                src={message.fileUrl}
                                alt="GIF"
                                className="max-w-full h-auto"
                            />
                        </div>
                    )}

                    {/* Metadata Row */}
                    <div
                        className={`
    flex items-center justify-end gap-2 mt-2
    text-[11px] font-medium
    ${isOwn ? "text-blue-100/80" : "text-gray-400"}
  `}
                    >
                        {message.isEdited && (
                            <span className="italic opacity-80">edited</span>
                        )}
                        <span>{formatTime(message.createdAt)}</span>
                    </div>


                    {/* Reactions Display */}
                    {message.reactions && message.reactions.length > 0 && (
                        <div
                            className={`
      absolute -bottom-3
      ${isOwn ? "right-3" : "left-3"}
      flex gap-1.5
      bg-white border border-gray-200
      px-2 py-1 rounded-full shadow-md
    `}
                        >
                            {Object.entries(reactionCounts).map(([emoji, count]) => (
                                <span
                                    key={emoji}
                                    className="flex items-center gap-1 text-xs font-medium"
                                >
                                    <span>{emoji}</span>
                                    {count > 1 && <span className="text-gray-600">{count}</span>}
                                </span>
                            ))}
                        </div>
                    )}

                </div>



                {/* Menu Trigger - 3 Dots Button (All Devices) */}
                {isOwn && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowMenu(true);
                            const rect = e.currentTarget.getBoundingClientRect();
                            setMenuPosition({ x: rect.left, y: rect.top });
                        }}
                        className="self-center ml-2 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
                        aria-label="Message options"
                    >
                        <MoreVertical className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Desktop Context Menu */}
            {showMenu && isOwn && (
                <div
                    ref={menuRef}
                    className="
    hidden md:block fixed
    bg-white
    rounded-xl
    border border-gray-100
    shadow-[0_12px_40px_rgba(0,0,0,0.12)]
    py-2
    z-[99999]
    min-w-[180px]
    animate-fadeIn
  "
                    style={{
                        top: `${menuPosition.y}px`,
                        left: `${menuPosition.x}px`,
                        transform: "translate(-50%, -110%)",
                    }}
                >
                    {message.messageType === "text" && onEdit && (
                        <button
                            onClick={handleEdit}
                            className="
        w-full flex items-center gap-3
        px-4 py-2.5
        text-left
        text-[14px] font-medium
        text-gray-700
        hover:bg-gray-50
        active:bg-gray-100
        transition-all duration-150
        rounded-lg
      "
                        >
                            <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
                                <Edit2 className="w-4 h-4 text-gray-600" />
                            </div>
                            <span>Edit Message</span>
                        </button>
                    )}

                    {onDelete && (
                        <button
                            onClick={handleDelete}
                            className="
        w-full flex items-center gap-3
        px-4 py-2.5
        text-left
        text-[14px] font-medium
        text-red-600
        hover:bg-red-50
        active:bg-red-100
        transition-all duration-150
        rounded-lg
      "
                        >
                            <div className="w-8 h-8 rounded-md bg-red-50 flex items-center justify-center">
                                <Trash2 className="w-4 h-4 text-red-600" />
                            </div>
                            <span>Delete Message</span>
                        </button>
                    )}
                </div>

            )}

            {/* Mobile Bottom Sheet Actions - Rendered via Portal */}
            {showMenu && isOwn && (
                <MobileMenuPortal>
                    {/* Backdrop */}
                    <div
                        className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[99998] transition-opacity duration-200"
                        onTouchEnd={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowMenu(false);
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowMenu(false);
                        }}
                    />

                    {/* Bottom Sheet */}
                    <div
                        ref={mobileMenuRef}
                        className="
      md:hidden fixed bottom-0 left-0 right-0
      bg-white
      rounded-t-3xl
      pt-4 pb-6
      px-5
      z-[99999]
      shadow-[0_-20px_60px_rgba(0,0,0,0.15)]
      animate-slideUp
    "
                        onTouchEnd={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                        style={{ touchAction: "manipulation" }}
                    >
                        {/* Drag Indicator */}
                        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

                        {/* Actions */}
                        <div className="space-y-2">

                            {message.messageType === "text" && onEdit && (
                                <button
                                    onTouchEnd={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleEdit(e);
                                    }}
                                    onClick={handleEdit}
                                    className="
            w-full flex items-center gap-4
            px-4 py-3
            rounded-xl
            hover:bg-gray-50
            active:bg-gray-100
            transition-all
            duration-150
          "
                                    style={{ touchAction: "manipulation" }}
                                >
                                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                                        <Edit2 className="w-4.5 h-4.5 text-gray-700" />
                                    </div>
                                    <span className="text-[15px] font-medium text-gray-800">
                                        Edit Message
                                    </span>
                                </button>
                            )}

                            {onDelete && (
                                <button
                                    onTouchEnd={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDelete(e);
                                    }}
                                    onClick={handleDelete}
                                    className="
            w-full flex items-center gap-4
            px-4 py-3
            rounded-xl
            hover:bg-red-50
            active:bg-red-100
            transition-all
            duration-150
          "
                                    style={{ touchAction: "manipulation" }}
                                >
                                    <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                                        <Trash2 className="w-4.5 h-4.5 text-red-600" />
                                    </div>
                                    <span className="text-[15px] font-medium text-red-600">
                                        Delete Message
                                    </span>
                                </button>
                            )}

                            {/* Divider */}
                            <div className="h-px bg-gray-100 my-3" />

                            {/* Cancel */}
                            <button
                                onTouchEnd={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowMenu(false);
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowMenu(false);
                                }}
                                className="
          w-full
          py-3
          text-center
          text-[15px]
          font-medium
          text-gray-500
          hover:text-gray-700
          transition-colors
        "
                                style={{ touchAction: "manipulation" }}
                            >
                                Cancel
                            </button>

                        </div>
                    </div>
                </MobileMenuPortal>

            )}


            {/* Mobile Actions for Received Messages - Rendered via Portal */}
            {showMenu && !isOwn && (
                <MobileMenuPortal>
                    {/* Backdrop */}
                    <div
                        className="
      fixed inset-0
      bg-black/50 backdrop-blur-[2px]
      z-[99998]
      animate-fadeIn
      transition-opacity duration-200
    "
                        onTouchEnd={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowMenu(false);
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowMenu(false);
                        }}
                    />

                    {/* Bottom Sheet */}
                    <div
                        ref={mobileMenuRef}
                        className="
      fixed bottom-0 left-0 right-0
      bg-white
      rounded-t-[28px]
      pt-4 pb-6 px-5
      z-[99999]
      animate-slideUp
      shadow-[0_-20px_60px_rgba(0,0,0,0.18)]
    "
                        onTouchEnd={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)",
                            touchAction: "manipulation",
                        }}
                    >
                        {/* Drag Indicator */}
                        <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-5" />

                        {/* Content */}
                        <div className="space-y-2">

                            {/* Cancel Button */}
                            <button
                                onTouchEnd={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowMenu(false);
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowMenu(false);
                                }}
                                className="
          w-full
          py-3.5
          rounded-xl
          text-center
          text-sm
          font-semibold
          text-gray-600
          bg-gray-50
          hover:bg-gray-100
          active:scale-[0.98]
          transition-all duration-150
        "
                                style={{ touchAction: "manipulation" }}
                            >
                                Cancel
                            </button>

                        </div>
                    </div>
                </MobileMenuPortal>

            )}
        </>
    );
}
