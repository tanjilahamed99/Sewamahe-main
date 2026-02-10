import { useState } from "react";
import { toast } from "sonner";
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
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import API from "@/lib/axios";
import configuration from "@/config/configuration";
import { updateUser } from "@/features/auth/authSlice";

interface QualificationPopupProps {
    open: boolean;
    onClose: () => void;
}

export const QualificationPopup =({ open, onClose }: QualificationPopupProps)=> {
    const user = useAppSelector((state) => state.auth.user);
    const [qualification, setQualification] = useState(user.qualification || "");
    const [perMinute, setPerMinute] = useState(user.price || 0);
    const [errors, setErrors] = useState<Record<string, string> | null>(null);
    const dispatch = useAppDispatch();

    const onChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await API.post(
                `${configuration.url}/api/user/qualification/set-price/${user?._id}`,
                {
                    qualification,
                    perMinute,
                }
            );
            if (data?.success) {
                onClose();
                dispatch(updateUser({
                    qualification: qualification.trim(),
                    price: Number(perMinute),
                }))
                toast.success("Details Updated!");
            }
        } catch (e) {
            setErrors(e.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Set Qualification & Fees</DialogTitle>
                </DialogHeader>

                <form onSubmit={onChangePassword} className="space-y-4">
                    <div>
                        <Input
                            placeholder="Qualification"
                            type="text"
                            onChange={(e) => setQualification(e.target.value)}
                            defaultValue={user.qualification}
                        />
                        {errors?.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            type="number"
                            onChange={(e) =>
                                setPerMinute(
                                    e.target.value as unknown as number
                                )
                            }
                            defaultValue={user.price || 0}
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
                            Update
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
