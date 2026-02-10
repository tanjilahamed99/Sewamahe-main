import { useState } from "react";
import { toast } from "sonner";
import { changePassword } from "@/actions/auth";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Input from "@/pages/Authentication/components/Input";
import { FaLock } from "react-icons/fa";
import { useAppSelector } from "@/hooks/useDispatch";

interface ResetPasswordPopupProps {
    open: boolean;
    onClose: () => void;
}

export const ResetPasswordPopup = ({ open, onClose }: ResetPasswordPopupProps)=> {
    const user = useAppSelector((state) => state.auth.user);
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string> | null>(null);

    const onChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            return setErrors({
                repeatPassword: "Repeat must be the same as password",
            });
        }

        try {
            await changePassword(user.email, repeatPassword, password);
            toast.success("Password changed!");
            onClose();
        } catch (e) {
            let errs: Record<string, string> = {};
            if (!e.response || typeof e.response.data !== "object") {
                errs.generic = "Could not connect to server.";
                toast.error("Password change failed!");
            } else {
                errs = e.response.data;
            }
            setErrors(errs);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Change user password</DialogTitle>
                </DialogHeader>

                <form onSubmit={onChangePassword} className="space-y-4">
                    <div>
                        <Input
                            icon={<FaLock />}
                            placeholder="New Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors?.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            icon={<FaLock />}
                            placeholder="Repeat Password"
                            type="password"
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                        {errors?.repeatPassword && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.repeatPassword}
                            </p>
                        )}
                    </div>

                    {errors?.generic && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.generic}
                        </p>
                    )}

                    <DialogFooter className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={onClose}
                                className="bg-gray-200 hover:bg-gray-300 text-black"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="bg-[#da7d02] hover:bg-[#da7d02]/80"
                        >
                            Change Password
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
