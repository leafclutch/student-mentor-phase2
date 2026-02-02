import type {  ChangeEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import {
  Search, MoreVertical, User, RefreshCw, Edit, Smile, Plus, Send, Paperclip, ArrowLeft 
} from 'lucide-react';

// Type for individual chat
interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

// Type for individual message
interface Message {
  id: number;
  sender: 'student' | 'mentor';
  text?: string;
  attachment?: string;
  size?: string;
  type?: string;
  time: string;
  date: string | null;
  read?: boolean;
}

// Messages object mapping chat IDs to arrays of messages
interface MessagesMap {
  [chatId: string]: Message[];
}

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChat, setSelectedChat] = useState<string>('sarah');
  const [messageInput, setMessageInput] = useState<string>('');
  const [showChatList, setShowChatList] = useState<boolean>(true);

  const chats: Chat[] = [
    {
      id: 'sarah',
      name: 'Sarah Jenkins',
      avatar: '👩',
      lastMessage: 'Thanks for the feedback on my design!',
      time: '10:42 AM',
      unread: 0,
      online: true
    },
    {
      id: 'michael',
      name: 'Michael Chen',
      avatar: '👨',
      lastMessage: 'Can we reschedule our call?',
      time: 'Yesterday',
      unread: 1,
      online: false
    },
    {
      id: 'emily',
      name: 'Emily Davis',
      avatar: '👩',
      lastMessage: "I've submitted the assignment.",
      time: 'Tue',
      unread: 2,
      online: false
    },
    {
      id: 'james',
      name: 'James Wilson',
      avatar: '👨',
      lastMessage: 'Sounds good, thanks!',
      time: 'Mon',
      unread: 0,
      online: false
    }
  ];

  const messages: MessagesMap = {
    sarah: [
      {
        id: 1,
        sender: 'student',
        text: 'Hi Dr. Morgan, could you please review my latest submission for the dashboard project? I\'m specifically unsure about the navigation hierarchy.',
        time: '4:30 PM',
        date: 'YESTERDAY'
      },
      {
        id: 2,
        sender: 'mentor',
        text: 'Hello Sarah! I\'d be happy to take a look. The navigation hierarchy can indeed be tricky for complex dashboards.',
        time: '4:35 PM',
        date: null
      },
      {
        id: 3,
        sender: 'mentor',
        text: 'Are you following the "F-pattern" layout we discussed in the last session?',
        time: '4:35 PM',
        date: null,
        read: true
      },
      {
        id: 4,
        sender: 'student',
        text: 'Yes, I tried to. I put the most critical actions on the top left. Here is the link to the Figma file.',
        time: '10:42 AM',
        date: 'TODAY'
      },
      {
        id: 5,
        sender: 'student',
        attachment: 'Dashboard_Wireframes_v3.fig',
        size: '12 MB',
        type: 'figma',
        time: '10:42 AM',
        date: null
      },
      {
        id: 6,
        sender: 'mentor',
        text: 'Thanks for the feedback! I\'m reviewing it now.',
        time: '10:45 AM',
        date: null,
        read: true
      }
    ]
  };

  const currentMessages: Message[] = messages[selectedChat] || [];
  const currentChat = chats.find(chat => chat.id === selectedChat);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId);
    setShowChatList(false);
  };

  const handleBackToList = () => {
    setShowChatList(true);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending:', messageInput);
      setMessageInput('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="h-screen bg-white flex">
      {/* Chat List Sidebar */}
      <div className={`${showChatList ? 'flex' : 'hidden'} lg:flex w-full lg:w-96 border-r border-gray-200 flex-col`}>
        {/* Chats Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Chats</h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Edit size={20} className="text-gray-600" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                selectedChat === chat.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg sm:text-xl">
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{chat.time}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-white font-medium">{chat.unread}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`${showChatList ? 'hidden' : 'flex'} lg:flex flex-1 flex-col`}>
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToList}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <div className="relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center text-base sm:text-lg">
                    {currentChat.avatar}
                  </div>
                  {currentChat.online && (
                    <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{currentChat.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Student • UI/UX Design Course</p>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <User size={18} className="sm:w-5 sm:h-5 text-gray-600" />
                </button>
                <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg">
                  <RefreshCw size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical size={18} className="sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
              {currentMessages.map((message, index) => {
                const showDate = message.date && (index === 0 || currentMessages[index - 1].date !== message.date);
                return (
                  <div key={message.id}>
                    {showDate && (
                      <div className="flex items-center justify-center my-4">
                        <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                          {message.date}
                        </span>
                      </div>
                    )}

                    {message.sender === 'student' ? (
                      <div className="flex gap-2 sm:gap-3 mb-4">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 text-sm sm:text-base">
                          {currentChat.avatar}
                        </div>
                        <div className="flex-1 max-w-lg">
                          {message.text && (
                            <div className="bg-white rounded-2xl rounded-tl-sm p-3 sm:p-4 shadow-sm">
                              <p className="text-gray-900 text-sm sm:text-base">{message.text}</p>
                            </div>
                          )}
                          {message.attachment && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mt-2 flex items-center gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{message.attachment}</p>
                                <p className="text-xs sm:text-sm text-gray-500">{message.size} • Figma</p>
                              </div>
                            </div>
                          )}
                          <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2 sm:gap-3 mb-4 justify-end">
                        <div className="flex-1 max-w-lg flex flex-col items-end">
                          <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm p-3 sm:p-4 shadow-sm">
                            <p className="text-sm sm:text-base">{message.text}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-gray-500">{message.time}</p>
                            {message.read && <span className="text-xs text-gray-500">✓✓</span>}
                          </div>
                        </div>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm sm:text-base">
                          👨‍🏫
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <div className="p-3 sm:p-4 bg-white border-t border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0">
                  <Plus size={18} className="sm:w-5 sm:h-5 text-gray-600" />
                </button>
                <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg flex-shrink-0">
                  <Paperclip size={20} className="text-gray-600" />
                </button>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-3 sm:px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
                <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg flex-shrink-0">
                  <Smile size={20} className="text-gray-600" />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0"
                >
                  <Send size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 p-4">
            <p className="text-sm sm:text-base">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
