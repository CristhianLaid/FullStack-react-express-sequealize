import { useForm } from "react-hook-form";
import { UserDataResponse } from "../../../../models";
import { Button, Input, Label } from "..";

interface AuthFormProps {
    onSubmit: (data: UserDataResponse) => void;
    buttonText: string;
    isRegister?: boolean;
}

export const FormAuth: React.FC<AuthFormProps> = ({ onSubmit, buttonText, isRegister }) => {
    const { register, formState: { errors }, handleSubmit } = useForm<UserDataResponse>();

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {isRegister && (
                <div>
                    <Label htmlFor="username">
                        Username
                    </Label>
                    <div className="mt-2">
                        <Input
                            type="text"
                            placeholder="Username...."
                            {...register("username", { required: true, minLength: 6 })}
                            aria-invalid={errors.username ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p role="alert">Username is required</p>
                        )}
                        {errors.username?.type === "minLength" && (
                            <p role="alert">Username must be at least 6 characters</p>
                        )}
                    </div>
                </div>
            )}

            <div>
                <Label htmlFor="email">
                    Email address
                </Label>
                <div className="mt-2">
                    <Input
                        type="email"
                        placeholder="Email21@gmail.com"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address"
                            }
                        })}
                        aria-invalid={errors.email ? "true" : "false"}
                    />
                    <p role="alert">{errors.email?.message}</p>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                        </a>
                    </div>
                </div>
                <div className="mt-2">
                    <Input
                        type="password"
                        placeholder="._.XD-Password"
                        {...register("password", { required: true, minLength: 6 })}
                        aria-invalid={errors.password ? "true" : "false"}
                    />
                    {errors.password?.type === "required" && (
                        <p role="alert">Password is required</p>
                    )}
                    {errors.password?.type === "minLength" && (
                        <p role="alert">Password must be at least 6 characters</p>
                    )}
                </div>
            </div>

            <div>
                <Button>
                    {buttonText}
                </Button>
            </div>
        </form>
    );
};
