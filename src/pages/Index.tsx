import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface Message {
  id: number;
  text: string;
  sender: string;
  avatar: string;
  timestamp: string;
  isOwn: boolean;
}

interface Contact {
  id: number;
  name: string;
  role: string;
  avatar: string;
  email: string;
  phone: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Привет! Как дела?',
      sender: 'Анна Смирнова',
      avatar: 'AS',
      timestamp: '10:30',
      isOwn: false,
    },
    {
      id: 2,
      text: 'Отлично! Работаю над новым проектом',
      sender: 'Вы',
      avatar: 'ВЫ',
      timestamp: '10:32',
      isOwn: true,
    },
    {
      id: 3,
      text: 'Звучит интересно! Расскажи подробнее',
      sender: 'Анна Смирнова',
      avatar: 'AS',
      timestamp: '10:33',
      isOwn: false,
    },
  ]);

  const [contacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'Анна Смирнова',
      role: 'Дизайнер',
      avatar: 'AS',
      email: 'anna@example.com',
      phone: '+7 (900) 123-45-67',
    },
    {
      id: 2,
      name: 'Иван Петров',
      role: 'Разработчик',
      avatar: 'ИП',
      email: 'ivan@example.com',
      phone: '+7 (900) 234-56-78',
    },
    {
      id: 3,
      name: 'Мария Козлова',
      role: 'Менеджер',
      avatar: 'МК',
      email: 'maria@example.com',
      phone: '+7 (900) 345-67-89',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      text: newMessage,
      sender: 'Вы',
      avatar: 'ВЫ',
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    setMessages([...messages, message]);
    setNewMessage('');
    toast.success('Сообщение отправлено');
  };

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter((msg) => msg.id !== id));
    toast.success('Сообщение удалено');
  };

  const handleEditMessage = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id: number) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, text: editText } : msg
      )
    );
    setEditingId(null);
    setEditText('');
    toast.success('Сообщение изменено');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F0FB] via-white to-[#E5DEFF] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1F2C] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Мессенджер
          </h1>
          <p className="text-lg text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Общайтесь с комфортом
          </p>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="chat" className="text-base">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Чат
            </TabsTrigger>
            <TabsTrigger value="contacts" className="text-base">
              <Icon name="Users" size={20} className="mr-2" />
              Контакты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="animate-fade-in">
            <Card className="shadow-lg border-none">
              <CardHeader className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <Icon name="MessageSquare" size={24} />
                  Переписка
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px] p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : 'flex-row'} animate-scale-in`}
                      >
                        <Avatar className="h-10 w-10 ring-2 ring-[#9b87f5]/20">
                          <AvatarFallback className={message.isOwn ? 'bg-[#9b87f5] text-white' : 'bg-[#E5DEFF] text-[#7E69AB]'}>
                            {message.avatar}
                          </AvatarFallback>
                        </Avatar>

                        <div className={`flex flex-col ${message.isOwn ? 'items-end' : 'items-start'} flex-1 max-w-[70%]`}>
                          <div className={`rounded-2xl px-4 py-3 ${message.isOwn ? 'bg-[#9b87f5] text-white' : 'bg-white border border-gray-200'} shadow-sm hover:shadow-md transition-shadow duration-200`}>
                            {editingId === message.id ? (
                              <div className="space-y-2">
                                <Input
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                                  autoFocus
                                />
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleSaveEdit(message.id)}
                                    className="bg-white text-[#9b87f5] hover:bg-white/90"
                                  >
                                    <Icon name="Check" size={16} />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={handleCancelEdit}
                                    className="text-white hover:bg-white/10"
                                  >
                                    <Icon name="X" size={16} />
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start gap-2">
                                <p className="text-sm leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                                  {message.text}
                                </p>
                                {message.isOwn && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-6 w-6 p-0 hover:bg-white/20"
                                      >
                                        <Icon name="MoreVertical" size={14} />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => handleEditMessage(message.id, message.text)}>
                                        <Icon name="Edit" size={16} className="mr-2" />
                                        Редактировать
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => handleDeleteMessage(message.id)}
                                        className="text-red-600"
                                      >
                                        <Icon name="Trash2" size={16} className="mr-2" />
                                        Удалить
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </div>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 mt-1 px-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="border-t p-4 bg-gray-50">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Введите сообщение..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    />
                    <Button onClick={handleSendMessage} className="bg-[#9b87f5] hover:bg-[#7E69AB]">
                      <Icon name="Send" size={20} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <Card key={contact.id} className="shadow-lg border-none hover-scale">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <Avatar className="h-20 w-20 ring-4 ring-[#9b87f5]/20">
                        <AvatarFallback className="bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] text-white text-xl">
                          {contact.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-lg text-[#1A1F2C]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {contact.name}
                        </h3>
                        <p className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                          {contact.role}
                        </p>
                      </div>
                      <div className="w-full space-y-2 text-sm text-gray-700" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        <div className="flex items-center gap-2 justify-center">
                          <Icon name="Mail" size={16} className="text-[#9b87f5]" />
                          <span>{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <Icon name="Phone" size={16} className="text-[#9b87f5]" />
                          <span>{contact.phone}</span>
                        </div>
                      </div>
                      <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]">
                        <Icon name="MessageCircle" size={16} className="mr-2" />
                        Написать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
