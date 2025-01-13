import { useState, useEffect, useCallback } from 'react';
import { Mic, Send, Upload } from 'lucide-react';
// import Image from 'next/image';
import PropTypes from 'prop-types';
import AnalyzeIcon from '../assets/icon.png';
import SummarizeIcon  from '../assets/pen.png';
import ExtractIcon from '../assets/light.png';
import InputFile from '../assets/Vector.png';
export default function ChatArea({ messages, setMessages, activeChatId }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiReply, setAiReply] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading chat data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [activeChatId]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = [{
      id: Date.now().toString(),
      content: "hello who are you ",
      sender: 'user',
      timestamp: new Date(),
    },{
      id: Date.now().toString(),
      content: ` Superconductors are materials that exhibit zero electrical resistance and the expulsion of 
      magnetic fields when cooled below a characteristic critical temperature. This phenomenon 
      was first discovered by Heike Kamerlingh Onnes in 1911 in mercury at 4.2 K. In a normal conductor, 
      electrical resistance arises due to the scattering of electrons by impurities, lattice vibrations 
      (phonons), and other electrons. However, in a superconductor, below its critical temperature, 
      electrons form Cooper pairs due to an attractive interaction mediated by lattice vibrations. These 
      Cooper pairs condense into a macroscopic quantum state described by a single wavefunction. `,
      sender: 'ai',
      timestamp: new Date(),
    }]

    setMessages([...messages, newMessage]);
    setInput('');

    // Here you would integrate with your backend
    // const response = await fetch('/api/chat', {
    //   method: 'POST',
    //   body: JSON.stringify({ message: input }),
    // })
    // const aiResponse = await response.json()
  };

  const handleMessageClick = useCallback(async (messageId) => {
    try {
      const response = await fetch(`/api/get-reply?messageId=${messageId}`);
      if (!response.ok) throw new Error('Failed to fetch reply');
      const data = await response.json();
      setAiReply(data.reply);
    } catch (error) {
      console.error('Error fetching reply:', error);
      setAiReply('Hi, this is a reply by AI.');
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Upload Button */}
      <div className="flex justify-end p-4">
        <button
          className="flex items-center bg-[#A2DD2F] hover:bg-[#8bc741] text-white px-[50px] py-[18px] rounded-[20px]"
          onClick={() => {
            /* Implement upload functionality */
            console.log('Upload Clicked');
          }}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-4 ${
              message.sender === 'user'
                ? 'bg-[#1c3b2e] text-white'
                : 'bg-[#152922] text-white'
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
      
      </div>

      {/* Input Area */}
      <div className="p-4 space-y-4">
        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
  {/* Analyze Button */}
  <button
    className="flex flex-col  w-[181px] h-[97px] hover:bg-[#234a3a] px-4 py-6 rounded-[17.76px] border-4 border-solid border-[#1E875A] "
    style={{
    
    //   borderImageSource: "linear-gradient(175.36deg, #1E875A 0%, #24614E 99.52%)",
      borderImageSlice: 1,
      background: "linear-gradient(190.55deg, rgba(17, 76, 58, 0.3) 30.36%, #0D2D25 128.67%)",
    }}
    onClick={() => {
      console.log("Analyze Clicked");
    }}
  >
    <img src={AnalyzeIcon} alt="Analyze Icon" className="mb-2 w-6 h-6" />
    Analyze
  </button>

  {/* Extract Button */}
  <button
    className="flex flex-col  w-[181px] h-[97px] hover:bg-[#234a3a] px-4 py-6 rounded-[17.76px] border-4 border-solid border-[#1E875A] "
    style={{
 
    //   borderImageSource: "linear-gradient(175.36deg, #1E875A 0%, #24614E 99.52%)",
      borderImageSlice: 1,
      background: "linear-gradient(190.55deg, rgba(17, 76, 58, 0.3) 30.36%, #0D2D25 128.67%)",
    }}
  onClick={() => {
    console.log("Button Clicked");
  }}
>
  <img src={ExtractIcon} alt="Extract Icon" className="mb-2 w-6 h-6" />
  Extract
</button>


  {/* Summarize Button */}
  <button
    className="flex flex-col  w-[181px] h-[97px] hover:bg-[#234a3a] px-4 py-6 rounded-[17.76px] border-4 border-solid border-[#1E875A] "
    style={{
    //   borderImageSource: "linear-gradient(175.36deg, #1E875A 0%, #24614E 99.52%)",
      borderImageSlice: 1,
      background: "linear-gradient(190.55deg, rgba(17, 76, 58, 0.3) 30.36%, #0D2D25 128.67%)",
    }}
    onClick={() => {
      console.log("Summarize Clicked");
    }}
  >
    <img src={SummarizeIcon} alt="Summarize Icon" className="mb-2 w-6 h-6" />
    Summarize
  </button>
</div>


        {/* Message Input */}
        <div className="flex gap-2 items-center w-[900px] bg-[#152922]  p-4 ml-[250px] mr-[75px] border-4 border-solid border-[#1E875A] rounded-[22px]">
  {/* Image/Icon */}
  <img src={InputFile} alt="Input Icon" className="w-4 h-4 mr-4" />

  {/* Input Field */}
  <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    
    placeholder="Start a new chat"
    className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-white placeholder:text-gray-400 "
  />

  {/* Microphone Button */}
  <button
    className="p-2 rounded hover:bg-[#234a3a]"
    onClick={() => {
      console.log("Mic Clicked");
    }}
  >
    <Mic className="h-5 w-5 text-gray-400" />
  </button>

  {/* Send Button */}
  <button
    className="p-2 rounded hover:bg-[#234a3a]"
    onClick={handleSend}
  >
    <Send className="h-5 w-5 text-gray-400" />
  </button>
</div>

      </div>
    </div>
  );
}

// Optional: Adding PropTypes for Prop Validation
ChatArea.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
      timestamp: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  setMessages: PropTypes.func.isRequired,
  activeChatId: PropTypes.string,
};
