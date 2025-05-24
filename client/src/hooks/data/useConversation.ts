import { create } from "zustand";
import { useToast } from "../use-toast";
import axiosInstance from "@/config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Message } from './useChat';

export type Conversation = {
    id: number;
    title: string;
    preview: string;
    date: string;
};

export const useConversationStore = create<{
    conversation?: Conversation,
    setConversation: (conversation: Conversation | undefined) => void;
}>((set) => ({
    conversation: undefined,
    setConversation: (conversation: Conversation | undefined) => set({ conversation }),
}));

export const useConversation = () => {
    const { conversation, setConversation } = useConversationStore();
    const { toast } = useToast();

    const { data: conversations, isLoading: isLoadingConversations, refetch: refetchConversations } = useQuery({
        queryKey: ["conversations"],
        queryFn: async () => {
            const response = await axiosInstance.get("/conversation/list");
            return response.data ?? ([] as Conversation[]);
        },
    });

    const { isPending: isCreatingConversation, mutateAsync: createConversationAsync } = useMutation({
        mutationFn: async (data: { title?: string, first_message?: string }) => {
            const response = await axiosInstance.post("/conversation/", data);
            return response.data;
        },
        onSuccess: (data) => {
            setConversation(data);
            toast({
                title: "Tạo cuộc trò chuyện thành công",
                description: "Cuộc trò chuyện đã được tạo thành công.",
                variant: "default",
            });
        },
        onError: () => {
            toast({
                title: "Tạo cuộc trò chuyện thất bại",
                description: "Đã xảy ra lỗi khi tạo cuộc trò chuyện.",
                variant: "destructive",
            });
        }
    });

    const { isPending: isDeletingConversation, mutate: deleteConversation } = useMutation({
        mutationFn: async (id: number) => {
            await axiosInstance.delete(`/conversation/${id}`);
            return id;
        },
        onSuccess: (id) => {
            refetchConversations();
            if (conversation?.id === id) {
                setConversation(undefined);
            }
            toast({
                title: "Xóa cuộc trò chuyện thành công",
                description: "Cuộc trò chuyện đã được xóa thành công.",
                variant: "default",
            });
        },
        onError: () => {
            toast({
                title: "Xóa cuộc trò chuyện thất bại",
                description: "Đã xảy ra lỗi khi xóa cuộc trò chuyện.",
                variant: "destructive",
            });
        }
    });

    return { createConversationAsync, isCreatingConversation, conversation, setConversation, conversations, isLoadingConversations, deleteConversation, isDeletingConversation };
};