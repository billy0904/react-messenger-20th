import React from 'react';

interface Message {
    senderId: number;
    text: string;
}

interface MessageListProps {
    messages: Message[];
    currentUserId: number;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
    return (
        <div className="flex flex-col w-full h-messageAreaHeight font-['Pretendard'] px-4 py-2 overflow-y-auto scrollbar-hide">
            {messages.map((message, index) => (
                <div key={index} className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}>
                    <p className={`px-[14px] py-[10px] max-w-[328px] rounded-[20px] break-all my-1 ${message.senderId === currentUserId ? 'bg-Purple/1 text-White' : 'bg-White text-black'}`}>
                        {message.text}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default MessageList;
