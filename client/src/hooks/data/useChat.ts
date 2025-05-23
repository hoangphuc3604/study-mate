import axiosInstance from "@/config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export type Message = {
  id: number;
  content: string;
  conversation_id: number;
  type: "user" | "bot";
};

const useChat = ({conversation_id}: {conversation_id: number}) => {
    const { toast} = useToast();
    const {
        data: messages,
        isPending: isLoadingMessages,
        refetch: reload,
        error: fetchMessagesError,
    } = useQuery({
        queryKey: ["load_messages"],
        queryFn: async () => {
            const response = await axiosInstance.get(`/conversation/${conversation_id}`);
            return response.data ?? ([] as Message[]);
        },
    });

    const {
        mutate: sendMessage,
        isPending: isSendingMessage,
        error: sendMessageError,
    } = useMutation({
        mutationFn: async ({ content }: { content: string }) => {
            const response = await axiosInstance.post("/chat/", { content, conversation_id });
            return response.data;
        },
        onSuccess: () => {
            reload();
        },
        onError: () => {
            toast({
                title: "Lỗi",
                description: "Không thể gửi tin nhắn. Vui lòng thử lại sau.",
                variant: "destructive",
            });
        },
    });

    return {
        sendMessage,
        isLoadingMessages,
        isSendingMessage,
        reload,
        fetchMessagesError,
        sendMessageError,
        messages,
    };
};

export default useChat;