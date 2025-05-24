import axiosInstance from "@/config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { create } from "zustand"; 
import { useToast } from "../use-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export type User = {
    id: number,
    email: string,
    password: string,
    fullname: string,
    created_at: string,
}

export const useUserStore = create<{
  user?: User;
  setUser: (user: User | undefined) => void;
}>((set) => ({
  user: undefined,
  setUser: (user: User | undefined) => set({ user }),
}));

const useAuth = () => {
    const { setUser, user } = useUserStore();
    const { toast } = useToast();
    const navigate = useNavigate();
    
    const { mutate: signIn, isPending: isSigningIn } = useMutation({
        mutationFn: async (data: { email: string; password: string }) => {
            const response = await axiosInstance.post("/auth/login", data);
            return response.data;
        },
        onSuccess: (data) => {
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.access_token);
            toast({
                title: "Đăng nhập thành công",
                description: "Chào mừng bạn trở lại!",
                variant: "default",
            })
            navigate("/");
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ error: string }>;
            const errorMessage =
                axiosError.response?.data?.error || "Vui lòng kiểm tra lại thông tin đăng nhập của bạn";

            toast({
                title: "Đăng nhập thất bại",
                description: errorMessage,
                variant: "destructive",
            });
        },
    });

    const { mutate: signUp, isPending: isSigningUp } = useMutation({
        mutationFn: async (data: { email: string; password: string; fullname: string }) => {
            const response = await axiosInstance.post("/auth/register", data);
            return response.data;
        },
        onSuccess: () => {
            toast({
                title: "Đăng ký thành công",
                description: "Chào mừng bạn đến với chúng tôi!",
                variant: "default",
            });
            navigate("/login");
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ error: string }>;
            const errorMessage =
                axiosError.response?.data?.error || "Vui lòng kiểm tra lại thông tin đăng ký của bạn";

            toast({
                title: "Đăng ký thất bại",
                description: errorMessage,
                variant: "destructive",
            });
        },
    });

    const { mutate: updateBasicInfo, isPending: updatingBasicInfo } = useMutation({
        mutationFn: async (data: { fullname: string; email: string }) => {
            const response = await axiosInstance.put("/auth/update/basic", data);
            return response.data as User;
        },
        onSuccess: (data) => {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            toast({
                title: "Cập nhật thông tin thành công",
                description: "Thông tin của bạn đã được cập nhật.",
                variant: "default",
            });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ error: string }>;
            const errorMessage =
                axiosError.response?.data?.error || "Đã xảy ra lỗi khi cập nhật thông tin";

            toast({
                title: "Cập nhật thông tin thất bại",
                description: errorMessage,
                variant: "destructive",
            });
        },
    });

    const { mutate: updatePassword, isPending: updatingPassword } = useMutation({
        mutationFn: async (data: { old_password: string; new_password: string; }) => {
            const response = await axiosInstance.put("/auth/update/password", data);
            return response.data;
        },
        onSuccess: () => {
            toast({
                title: "Cập nhật mật khẩu thành công",
                description: "Mật khẩu của bạn đã được cập nhật.",
                variant: "default",
            });
            logout(false);
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ error: string }>;
            const errorMessage =
                axiosError.response?.data?.error || "Đã xảy ra lỗi khi cập nhật mật khẩu";

            toast({
                title: "Cập nhật mật khẩu thất bại",
                description: errorMessage,
                variant: "destructive",
            });
        },
    });

    const logout = (isShowToast: boolean = true) => {
        setUser(undefined);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        if (isShowToast) {
            toast({
                title: "Đăng xuất thành công",
                description: "Bạn đã đăng xuất khỏi tài khoản của mình.",
                variant: "default",
            });
        }
        navigate("/login");
    }

    return {
        user,
        setUser,
        signIn,
        isSigningIn,
        signUp,
        isSigningUp,
        updateBasicInfo,
        updatingBasicInfo,
        updatePassword,
        updatingPassword,
        logout,
    };
};

export default useAuth;
