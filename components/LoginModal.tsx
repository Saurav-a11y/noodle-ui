'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/Dialog";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import LoginIcon from "@/icons/LoginIcon";
import DarkNoodlesLogo from "@/icons/DarkNoodlesLogo";
import NoodlesLogo from "@/icons/NoodlesLogo";
import useThemeMode from "@/lib/useThemkMode";
import { useLogin } from '@/hooks/auth/useLogin';
import { useRegister } from '@/hooks/auth/useRegister';
import { useForgotPassword } from '@/hooks/auth/useForgotPassword';
import { useResetPassword } from '@/hooks/auth/useResetPassword';
import toast from "react-hot-toast";

type LoginModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
	const { isDark } = useThemeMode();

	const [mode, setMode] = useState<"login" | "register" | "forgot" | "reset">("login");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [resetPassword, setResetPassword] = useState({
		newPassword: "",
		confirmPassword: "",
	});

	const { login } = useLogin();
	const { register } = useRegister();
	const { forgotPassword } = useForgotPassword();
	const { resetPassword: resetPasswordApi } = useResetPassword();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			if (mode === "forgot") {
				if (!formData.email) {
					toast.error("Email is required");
					setIsLoading(false);
					return;
				}

				await forgotPassword(formData.email);

				toast.success("Email verified. Please set a new password.");

				setMode("reset");
				setIsLoading(false);
				return;
			}

			if (mode === "reset") {
				if (!resetPassword.newPassword || !resetPassword.confirmPassword) {
					toast.error("Please fill all password fields");
					setIsLoading(false);
					return;
				}

				if (resetPassword.newPassword !== resetPassword.confirmPassword) {
					toast.error("Passwords do not match");
					setIsLoading(false);
					return;
				}

				if (resetPassword.newPassword.length < 6) {
					toast.error("Password must be at least 6 characters");
					setIsLoading(false);
					return;
				}

				await resetPasswordApi(formData.email, resetPassword.newPassword);

				toast.success("Password reset successfully. Please log in.");

				setMode("login");
				setResetPassword({ newPassword: "", confirmPassword: "" });
				setIsLoading(false);
				return;
			}

			// ===== REGISTER =====
			if (mode === "register") {
				if (!formData.name) {
					toast.error("Username is required");
					setIsLoading(false);
					return;
				}

				if (!formData.email || !formData.password) {
					toast.error("Please fill all required fields");
					setIsLoading(false);
					return;
				}

				if (formData.password !== formData.confirmPassword) {
					toast.error("Passwords do not match");
					setIsLoading(false);
					return;
				}

				if (formData.password.length < 6) {
					toast.error("Password must be at least 6 characters");
					setIsLoading(false);
					return;
				}

				await register(
					formData.name,
					formData.email,
					formData.password
				);

				toast.success("Account created successfully. Please log in.");

				setMode("login");
				setIsLoading(false);
				return;
			}

			if (mode === "login") {
				if (!formData.email || !formData.password) {
					toast.error("Email and password are required");
					setIsLoading(false);
					return;
				}

				await login(formData.email, formData.password);

				toast.success("Welcome back 👋");

				onOpenChange(false);
				resetToLogin();
				return;
			}
		} catch (err: any) {
			console.error(err);
			toast.error(err?.message || "Something went wrong");
			setIsLoading(false);
		}

		setIsLoading(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const resetToLogin = () => {
		setMode("login");
		setFormData({
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		});
		setResetPassword({
			newPassword: "",
			confirmPassword: "",
		});
		setShowPassword(false);
		setShowConfirmPassword(false);
		setIsLoading(false);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				onOpenChange(open);
				if (!open) resetToLogin();
			}}>
			<DialogContent className="sm:max-w-lg w-full bg-[var(--bg-block)] overflow-y-scroll max-h-[calc(100vh-64px)]">
				<DialogHeader>
					<DialogTitle className="text-center text-xl font-semibold text-reddit text-[var(--text)]">
					</DialogTitle>
				</DialogHeader>
				<div className="mb-8 flex justify-center gap-2">
					{isDark ? <DarkNoodlesLogo /> : <NoodlesLogo />}
				</div>
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-foreground mb-2">
						{mode === "login" && "Welcome back,"}
						{mode === "register" && "Create an account,"}
						{mode === "forgot" && "Forgot password"}
						{mode === "reset" && "Set new password"}
					</h1>
					<p className="text-muted-foreground">
						{mode === "login" && "Log in to your account"}
						{mode === "register" && "Register to get started."}
					</p>
				</div>
				<form onSubmit={handleSubmit} className="space-y-5">
					{mode === "register" && (
						<div className="space-y-2">
							<Label htmlFor="name" className="text-sm font-medium text-foreground">
								Username
							</Label>
							<div className="relative mt-2">
								<User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
								<Input
									id="name"
									name="name"
									type="text"
									placeholder="Enter username..."
									value={formData.name}
									onChange={handleChange}
									className="pl-12"
								/>
							</div>
						</div>
					)}

					{mode === "reset" && (
						<>
							<div className="space-y-2">
								<Label className="text-sm font-medium text-foreground">
									New password
								</Label>
								<Input
									type="password"
									value={resetPassword.newPassword}
									onChange={(e) =>
										setResetPassword((p) => ({
											...p,
											newPassword: e.target.value,
										}))
									}
								/>
							</div>

							<div className="space-y-2">
								<Label className="text-sm font-medium text-foreground">
									Confirm password
								</Label>
								<Input
									type="password"
									value={resetPassword.confirmPassword}
									onChange={(e) =>
										setResetPassword((p) => ({
											...p,
											confirmPassword: e.target.value,
										}))
									}
								/>
							</div>
						</>
					)}
					{(mode === "login" || mode === "register" || mode === "forgot") && (
						<div className="space-y-2">
							<Label htmlFor="email" className="text-sm font-medium text-foreground">
								Email
							</Label>
							<div className="relative mt-2">
								<Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="Enter your email address"
									value={formData.email}
									onChange={handleChange}
									className="pl-12"
								/>
							</div>
						</div>
					)}
					{mode === "forgot" && (
						<div className="flex justify-center">
							<button
								type="button"
								onClick={() => setMode("login")}
								className="text-sm font-semibold cursor-pointer transition-colors text-[#494949]"
							>
								← Back to login
							</button>
						</div>
					)}
					{(mode === "login" || mode === "register") && (
						<div className="space-y-2">
							<Label htmlFor="password" className="text-sm font-medium text-foreground">
								Password
							</Label>
							<div className="relative mt-2">
								<Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
								<Input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									placeholder="Enter password..."
									value={formData.password}
									onChange={handleChange}
									className="pl-12 pr-12"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
								>
									{!showPassword ? (
										<EyeOff className="h-5 w-5" />
									) : (
										<Eye className="h-5 w-5" />
									)}
								</button>
							</div>
						</div>
					)}
					{mode === "register" && (
						<div className="space-y-2">
							<Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
								Confirm password
							</Label>
							<div className="relative mt-2">
								<Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
								<Input
									id="confirmPassword"
									name="confirmPassword"
									type={showConfirmPassword ? "text" : "password"}
									placeholder="Re-enter password"
									value={formData.confirmPassword}
									onChange={handleChange}
									className="pl-12"
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
								>
									{!showConfirmPassword ? (
										<EyeOff className="h-5 w-5" />
									) : (
										<Eye className="h-5 w-5" />
									)}
								</button>
							</div>
						</div>
					)}
					{mode === "login" &&
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={rememberMe}
									onChange={(e) => setRememberMe(e.target.checked)}
								/>
								<span className="text-sm text-muted-foreground">
									Remember me
								</span>
							</div>
							<div className="flex justify-end">
								<button
									type="button"
									onClick={() => setMode("forgot")}
									className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#DDF346] to-[#84EA07] cursor-pointer"
								>
									Forgot your password?
								</button>
							</div>
						</div>
					}
					<div>
						<Button
							type="submit"
							className=" mb-4 px-4.5 py-2.5 w-full rounded-full font-medium text-sm transition-colors bg-gradient-to-r from-[#DDF346] to-[#84EA07] cursor-pointer text-[#494949] font-space"
							disabled={isLoading}
						>
							{isLoading ? (
								<div className="flex items-center gap-2">
									<div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
									<span>Processing...</span>
								</div>
							) : mode === "login" ? (
								"Log in"
							) : mode === "register" ? (
								"Register"
							) : mode === "forgot" ? (
								"Continue"
							) : (
								"Reset password"
							)}
						</Button>
						{(mode === "login" || mode === "register") && (
							<p className="text-center text-sm text-muted-foreground">
								{mode === "login" ? "Don't have an account yet?" : "Do you already have an account?"}{" "}
								<button
									type="button"
									onClick={() => setMode(mode === "login" ? "register" : "login")}
									className="font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#DDF346] to-[#84EA07] cursor-pointer"
								>
									{mode === "login" ? "Register" : "Log in"}
								</button>
							</p>
						)}
					</div>
				</form>
				<div className="flex justify-center">
					<LoginIcon />
				</div>
			</DialogContent>
		</Dialog>
	);
}