
import { useState } from "react";
import { MessageSquare, Clock, Settings, LogOut } from "lucide-react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MyImage from "../assets/Rectangle.png";
export default function Sidebar({ onChatChange, setIsSettingsOpen }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null); // Track selected chat

  const profile = {
    name: "User",
    email: "user@example.com",
    avatar:
      "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg",
  };

  const dummyChats = ["chat", "chat-1", "chat-2"];

  return (
    <div
      className="w-64 bg-gradient-to-r from-[#124D38] to-[#102E29] flex flex-col ml-[23px] my-[18px] border-4 border-solid border-[#1E875A] rounded-[25px]"
      style={{
        // borderWidth: "3px solid red",
        // borderStyle: "solid",
        // borderRadius: "25px",
        // borderImageSource:
        //   "linear-gradient(175.36deg, #1E875A 0%, #24614E 99.52%)",
        borderImageSlice: 1,
      }}
    >
      {/* Profile Section */}
      <div className="flex items-center gap-3 mb-6 p-4 ">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={profile.avatar}
            alt="Profile"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-white font-medium">{profile.name}</h3>
          <p className="text-sm text-gray-400">{profile.email}</p>
        </div>
      </div>

      {/* New Chat Dialog */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
          <div className="bg-[#0e261c] text-white rounded-lg p-6 w-80">
            <h2 id="dialog-title" className="text-xl font-semibold mb-4">
              Start a New Chat
            </h2>
            <p className="text-gray-400 mb-6">
              Do you want to start a new session?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  onChatChange("chat-new");
                  setIsDialogOpen(false);
                  setSelectedChat("chat-new"); // Set the new chat as selected
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Chat Button */}
      <button
        onClick={() => setIsDialogOpen(true)}
        className="w-full max-w-[calc(100%-3rem)] mb-6 bg-white text-black hover:bg-gray-100 rounded-full py-2 mx-auto"
>
        <AddCircleIcon className="h-6 w-6 bg-gradient-to-r from-[#124D38] to-[#102E29] bg-clip-text  " />
        New Chat
      </button>

      {/* Navigation */}
      <nav className="flex-1">
        
        {dummyChats.map((chat, index) => (
            <button
              key={chat}
              onClick={() => {
                onChatChange(chat);
                setSelectedChat(chat); // Mark this chat as selected
              }}
              className={`w-full flex items-center justify-start text-white mb-2 p-0  py-2 rounded bg-transparent`} // No `pl-4` here; handled in styles
            >
              {/* Left Indicator */} 
              {selectedChat === chat ? (
                <img  src= {MyImage} className="mr-2 h-4 w-4" />
              ):(
                <div className="mr-2 h-4 w-4"></div>
              )}
              {/* Chat Icon */}
              <MessageSquare className="mr-2 h-4 w-4" />
          
              {/* Chat Name */}
              <span>Chat {index * 1 == 0 ? "" : index * 1}</span>
            </button>
          ))}
          
          
        <button
          onClick={() => {
            console.log("Chat History Clicked");
          }}
          className="w-full flex items-center justify-start text-white mb-2 p-2 rounded bg-transparent"
        >
          <Clock className="mr-2 h-4 w-4" />
          Chat History
        </button>
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-4  mb-10">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="w-full flex items-center justify-start text-white mb-2 p-2 rounded bg-transparent"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </button>
        <button
          onClick={() => {
            console.log("Log Out Clicked");
          }}
          className="w-full flex items-center justify-start text-white p-2 rounded bg-transparent"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </button>
      </div>
    </div>
  );
}
