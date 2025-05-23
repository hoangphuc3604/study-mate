import { create } from "zustand";
import { useToast } from "../use-toast";
import axiosInstance from "@/config";
import { useMutation } from "@tanstack/react-query";

export type Conversation = {
    id: number;
    title: string;
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

    return { createConversationAsync, isCreatingConversation, conversation, setConversation };
};