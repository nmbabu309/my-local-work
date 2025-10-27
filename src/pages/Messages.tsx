import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getMessages, getUsers, sendMessage, Message, User } from '@/lib/storage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';

const Messages = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversationPartners, setConversationPartners] = useState<User[]>([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }
    setCurrentUser(user);

    const userMessages = getMessages(user.id);
    setMessages(userMessages);

    // Get unique conversation partners
    const partnerIds = new Set<string>();
    userMessages.forEach(msg => {
      if (msg.senderId !== user.id) partnerIds.add(msg.senderId);
      if (msg.receiverId !== user.id) partnerIds.add(msg.receiverId);
    });

    const allUsers = getUsers();
    const partners = allUsers.filter(u => partnerIds.has(u.id));
    setConversationPartners(partners);

    if (partners.length > 0 && !selectedUser) {
      setSelectedUser(partners[0]);
    }
  }, [navigate, selectedUser]);

  const handleSendMessage = () => {
    if (!currentUser || !selectedUser || !newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      senderName: currentUser.name,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };

    sendMessage(message);
    setMessages([message, ...messages]);
    setNewMessage('');
    toast.success('Message sent');
  };

  const getConversationMessages = () => {
    if (!currentUser || !selectedUser) return [];
    return messages
      .filter(m => 
        (m.senderId === currentUser.id && m.receiverId === selectedUser.id) ||
        (m.senderId === selectedUser.id && m.receiverId === currentUser.id)
      )
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Messages</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[480px]">
                {conversationPartners.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No conversations yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {conversationPartners.map(user => (
                      <div
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedUser?.id === user.id 
                            ? 'bg-primary/10 border border-primary' 
                            : 'hover:bg-muted'
                        }`}
                      >
                        <Avatar>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{user.userType}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedUser ? `Chat with ${selectedUser.name}` : 'Select a conversation'}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-[480px]">
              {selectedUser ? (
                <>
                  <ScrollArea className="flex-1 mb-4">
                    <div className="space-y-4 p-4">
                      {getConversationMessages().map(msg => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              msg.senderId === currentUser.id
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Select a conversation to start messaging
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Messages;
