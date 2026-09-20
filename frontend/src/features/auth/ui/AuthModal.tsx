import { useEffect, useState, type ReactNode } from "react";

import logo from "@/shared/assets/logo.svg";
import authUserIcon from "@/shared/assets/auth-user.svg";
import authEmailIcon from "@/shared/assets/auth-email.svg";
import authPhoneIcon from "@/shared/assets/auth-phone.svg";
import authLockIcon from "@/shared/assets/auth-lock.svg";
import authEyeClosedIcon from "@/shared/assets/auth-eye-closed.svg";
import authEyeOpenIcon from "@/shared/assets/auth-eye-open.svg";
import phoneFooter from "@/shared/assets/phone_for_footer.png";
import emailFooter from "@/shared/assets/email_for_footer.png";
import facebookFooter from "@/shared/assets/facebook_for_footer.png";
import instaFooter from "@/shared/assets/insta_for_footer.png";
import locationFooter from "@/shared/assets/location_footer.png";

type AuthMode = "login" | "signup";
type SignupStep = 1 | 2 | 3 | 4;
type Plan = "personal" | "corporate";

type AuthModalProps = {
  open: boolean;
  initialMode?: AuthMode;
  onClose: () => void;
};

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M5 12.5L9.2 16.5L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <img
      src={authUserIcon}
      alt=""
      className="h-8 w-8 shrink-0 object-contain"
      aria-hidden="true"
    />
  );
}

function CorporateIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-8 w-8 shrink-0"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="4.5"
        y="10"
        width="23"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M11 10V7.5C11 6.12 12.12 5 13.5 5H18.5C19.88 5 21 6.12 21 7.5V10M4.5 16C10.8 18.5 21.2 18.5 27.5 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <img
      src={authEmailIcon}
      alt=""
      className="h-8 w-8 shrink-0 object-contain"
      aria-hidden="true"
    />
  );
}

function PhoneIcon() {
  return (
    <img
      src={authPhoneIcon}
      alt=""
      className="h-8 w-8 shrink-0 object-contain"
      aria-hidden="true"
    />
  );
}

function LockIcon() {
  return (
    <img
      src={authLockIcon}
      alt=""
      className="h-8 w-8 shrink-0 object-contain"
      aria-hidden="true"
    />
  );
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return (
    <img
      src={hidden ? authEyeClosedIcon : authEyeOpenIcon}
      alt=""
      className="h-6 w-6 shrink-0 object-contain"
      aria-hidden="true"
    />
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M5 12H19M14 7L19 12L14 17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M19 12H5M10 7L5 12L10 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Progress({ step }: { step: 1 | 2 | 3 | 4 }) {
  const items = ["Plan", "Your Info", "Password"] as const;

  return (
    <div className="mx-auto flex h-8 w-full max-w-[326px] items-center text-[14px] font-normal leading-none text-silver-200 sm:max-w-[400px] sm:text-[13px]">
      {items.map((label, index) => {
        const number = (index + 1) as 1 | 2 | 3;
        const done = number < step;
        const active = number === step;

        return (
          <div key={label} className="contents">
            <div
              className={`flex shrink-0 items-center gap-[6px] ${active ? "text-forest-100" : ""}`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] text-[11px] sm:border-2 sm:text-[13px] ${
                  done
                    ? "border-forest-100 bg-forest-100 text-white"
                    : active
                      ? "border-forest-100 text-forest-100"
                      : "border-silver-100 text-silver-100"
                }`}
              >
                {done ? <CheckIcon /> : number}
              </span>
              <span className="whitespace-nowrap">{label}</span>
            </div>
            {index < items.length - 1 && (
              <span className="mx-1 h-[2px] w-4 shrink-0 bg-silver-100 sm:mx-3 sm:w-auto sm:min-w-4 sm:flex-1" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
  onBlur,
  required,
  invalid = false,
  trailing,
  inputMode,
  maxLength,
}: {
  label: string;
  type?: string;
  placeholder: string;
  icon: ReactNode;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  invalid?: boolean;
  trailing?: ReactNode;
  inputMode?: "text" | "email" | "tel" | "numeric";
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="mb-[4px] ml-2 block text-[16px] font-normal leading-none sm:text-[18px]">
        {label}
      </span>
      <div
        className={`flex h-[56px] items-center gap-2 rounded-[16px] border-[1.5px] px-4 text-forest-300 transition-[border-color,box-shadow,background-color] duration-200 sm:h-[56px] sm:rounded-[16px] sm:px-4 ${
          invalid
            ? "border-rose-300 bg-rose-100/10 shadow-[0_0_0_2px_rgba(179,21,142,0.08)]"
            : "border-forest-400 focus-within:border-forest-100"
        }`}
      >
        {icon}
        <input
          type={type}
          value={value}
          required={required}
          inputMode={inputMode}
          maxLength={maxLength}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
          className="h-full min-w-0 flex-1 bg-transparent text-[16px] font-normal outline-none placeholder:text-silver-200"
        />
        {trailing}
      </div>
    </label>
  );
}

function MobileAuthFooter() {
  return (
    <footer className="-mx-8 mt-16 w-[calc(100%+4rem)] bg-forest-400 px-4 pb-9 pt-4 text-rose-50 sm:hidden">
      <div className="mx-auto w-full max-w-[358px]">
        <div className="flex flex-col gap-2">
          <img src={logo} alt="Fleunique" className="h-auto w-[160px]" />

          <p className="text-justify text-[16px] font-normal leading-[16px]">
            Fleunique crafts bold, artistic, playful bouquets for truly unique
            people. Our vivid floral charm brightens any gloomy day.
          </p>
        </div>

        <div className="mt-4 flex h-[42px] items-center justify-between px-6">
          {[
            [phoneFooter, "Phone"],
            [emailFooter, "Email"],
            [facebookFooter, "Facebook"],
            [instaFooter, "Instagram"],
            [locationFooter, "Location"],
          ].map(([src, alt]) => (
            <img
              key={alt}
              src={src}
              alt={alt}
              className="h-8 w-8 object-contain"
            />
          ))}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] font-normal leading-none text-silver-100">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies Settings</a>
          </div>

          <p className="mt-4 text-center text-[11px] font-normal leading-none text-silver-100">
            ©2026, IT STEP COLLEGE TEAM
          </p>
        </div>
      </div>
    </footer>
  );
}

export function AuthModal({
  open,
  initialMode = "login",
  onClose,
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [signupStep, setSignupStep] = useState<SignupStep>(1);
  const [plan, setPlan] = useState<Plan>("personal");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const emailIsValid = (value: string) =>
    /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/.test(
      value.trim(),
    );
  const passwordIsValid = (value: string) =>
    value.length >= 8 && value.length <= 16;
  const confirmPasswordIsValid =
    confirmPassword.length > 0 &&
    passwordIsValid(confirmPassword) &&
    confirmPassword === password;

  const handleLoginSubmit = async () => {
    markTouched("loginEmail");
    markTouched("loginPassword");

    if (!emailIsValid(email) || !passwordIsValid(password)) return;

    setIsLoading(true);
    setApiError(null);

    try {
      // OAuth2PasswordRequestForm requires URLSearchParams
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to login");
      }

      const data = await response.json();

      // Store tokens
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      handleClose();
    } catch (error: any) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async () => {
    markTouched("signupPassword");
    markTouched("confirmPassword");

    if (!passwordIsValid(password) || !confirmPasswordIsValid) return;

    setIsLoading(true);
    setApiError(null);

    try {
      const payload = {
        full_name: fullName,
        email: email,
        password: password,
        password_confirm: confirmPassword,
        account_type: plan === "corporate" ? "business" : "personal",
        phone_number: phone || null,
      };

      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Registration failed");
      }

      // Success, move to the final screen
      setSignupStep(4);
    } catch (error: any) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const resetAuthState = () => {
    setMode(initialMode);
    setSignupStep(1);
    setPlan("personal");
    setFullName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setTouched({});
    setApiError(null);
    setIsLoading(false);
  };

  const handleClose = () => {
    resetAuthState();
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    setMode(initialMode);

    const body = document.body;
    const html = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPaddingRight = body.style.paddingRight;
    const previousHtmlOverflow = html.style.overflow;

    // Keep the background in place and remove the browser scrollbar/white gutter.
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        resetAuthState();
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPaddingRight;
      html.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, initialMode, onClose]);

  if (!open) return null;

  const switchToSignup = () => {
    setMode("signup");
    setSignupStep(1);
  };

  const switchToLogin = () => {
    setMode("login");
    setSignupStep(1);
  };

  const goBack = () => {
    if (signupStep === 1) {
      switchToLogin();
      return;
    }
    setSignupStep((signupStep - 1) as SignupStep);
  };

  const modalHeight =
    mode === "login" ? "sm:min-h-[443px]" : "sm:min-h-[587px]";

  return (
    <div
      className="auth-modal-scroll fixed left-0 top-0 z-40 flex h-dvh w-screen max-w-none items-start justify-center overflow-y-auto bg-rose-50 p-0 sm:z-[100] sm:items-center sm:bg-black/65 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label={mode === "login" ? "Log in" : "Sign up"}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) handleClose();
      }}
    >
      <div
        className={`relative flex min-h-dvh w-full flex-col bg-rose-50 px-8 pb-0 pt-[120px] font-montserrat text-forest-300 sm:min-h-0 sm:w-[736px] sm:rounded-[32px] sm:p-8 ${modalHeight}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-6 top-6 z-10 hidden text-forest-300 transition-opacity hover:opacity-60 sm:right-8 sm:top-8 sm:block"
        >
          <CloseIcon />
        </button>

        {mode === "login" ? (
          <div className="mx-auto flex w-full max-w-[672px] flex-1 flex-col sm:justify-center">
            <h2 className="mb-7 text-center font-pt-sans text-[30px] font-bold uppercase leading-none sm:text-[36px]">
              Log In
            </h2>

            <div className="mx-auto w-full max-w-[294px] space-y-4 sm:max-w-[608px]">
              <Field
                label="E-mail*"
                type="email"
                placeholder="example.com"
                icon={<MailIcon />}
                value={email}
                onChange={(value) => setEmail(value.replace(/\s/g, ""))}
                onBlur={() => markTouched("loginEmail")}
                invalid={Boolean(touched.loginEmail && !emailIsValid(email))}
                inputMode="email"
                required
              />

              <div>
                <Field
                  label="Password*"
                  type={showPassword ? "text" : "password"}
                  placeholder="example_123"
                  icon={<LockIcon />}
                  value={password}
                  onChange={setPassword}
                  onBlur={() => markTouched("loginPassword")}
                  invalid={Boolean(
                    touched.loginPassword && !passwordIsValid(password),
                  )}
                  maxLength={16}
                  required
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label="Toggle password visibility"
                    >
                      <EyeIcon hidden={!showPassword} />
                    </button>
                  }
                />
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    className="inline-block text-[12px] text-silver-100 transition-colors hover:text-forest-200"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              {apiError && (
                <div className="mt-2 text-[14px] text-rose-300 text-center">
                  {apiError}
                </div>
              )}

              <button
                type="button"
                disabled={
                  !emailIsValid(email) ||
                  !passwordIsValid(password) ||
                  isLoading
                }
                onClick={handleLoginSubmit}
                className="mt-2 flex h-[48px] w-full items-center justify-center rounded-full bg-rose-100 text-[18px] font-semibold shadow-[0_3px_5px_rgba(0,0,0,0.12)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>

              <p className="text-center text-[12px] text-silver-100">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={switchToSignup}
                  className="text-forest-300 hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col">
            <div className="px-0 sm:pr-8">
              <Progress step={signupStep} />
            </div>

            {signupStep === 1 && (
              <div className="flex flex-1 flex-col">
                <h2 className="mt-[40px] text-center font-pt-sans text-[30px] font-bold uppercase leading-none sm:mt-[54px] sm:text-[36px]">
                  Sign Up
                </h2>

                <div className="mx-auto mt-8 w-full max-w-[294px] sm:mt-[54px] sm:max-w-[608px]">
                  <p className="mb-4 text-justify text-[16px] font-normal leading-[16px] text-forest-200 sm:h-[40px] sm:leading-[20px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>

                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => setPlan("personal")}
                      className={`flex h-[72px] w-full items-center gap-3 rounded-[16px] border-[1.5px] px-4 text-left ${plan === "personal" ? "border-forest-400" : "border-silver-100"}`}
                    >
                      <UserIcon />
                      <span>
                        <span className="block text-[16px] font-semibold leading-none sm:text-[18px]">
                          Personal Plan
                        </span>
                        <span className="mt-1 hidden text-[14px] text-silver-200 sm:block">
                          Perfect for personal bouquet orders and gifts.
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPlan("corporate")}
                      className={`flex h-[72px] w-full items-center gap-3 rounded-[16px] border-[1.5px] px-4 text-left ${plan === "corporate" ? "border-forest-400" : "border-silver-100"}`}
                    >
                      <CorporateIcon />
                      <span>
                        <span className="block text-[16px] font-semibold leading-none sm:text-[18px]">
                          Corporate Plan
                        </span>
                        <span className="mt-1 hidden text-[14px] text-silver-200 sm:block">
                          For business orders and wholesale floral services.
                        </span>
                      </span>
                    </button>
                  </div>
                </div>

                <div className="mx-auto mt-auto w-full max-w-[326px] pt-8 sm:max-w-[608px]">
                  <button
                    type="button"
                    onClick={() => setSignupStep(2)}
                    className="mx-auto flex h-[44px] w-[205px] items-center justify-center gap-3 rounded-full bg-rose-100 text-[16px] font-semibold shadow-[0_3px_5px_rgba(0,0,0,0.12)] sm:h-[48px] sm:w-full sm:text-[18px]"
                  >
                    Continue <ArrowRightIcon />
                  </button>
                  <p className="mt-4 text-center text-[12px] text-silver-100">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={switchToLogin}
                      className="text-forest-300 hover:underline"
                    >
                      Log In
                    </button>
                  </p>
                </div>
              </div>
            )}

            {signupStep === 2 && (
              <div className="flex flex-1 flex-col">
                <h2 className="mt-[40px] text-center font-pt-sans text-[30px] font-bold uppercase leading-none sm:mt-[54px] sm:text-[36px]">
                  Sign Up
                </h2>
                <div className="mx-auto mt-7 w-full max-w-[326px] space-y-4 sm:mt-10 sm:max-w-[608px]">
                  <Field
                    label="Full Name*"
                    placeholder="John Doe"
                    icon={<UserIcon />}
                    value={fullName}
                    onChange={setFullName}
                    onBlur={() => markTouched("fullName")}
                    invalid={Boolean(touched.fullName && !fullName.trim())}
                    required
                  />
                  <Field
                    label="E-mail*"
                    type="email"
                    placeholder="example@gmail.com"
                    icon={<MailIcon />}
                    value={email}
                    onChange={(value) => setEmail(value.replace(/\s/g, ""))}
                    onBlur={() => markTouched("signupEmail")}
                    invalid={Boolean(
                      touched.signupEmail && !emailIsValid(email),
                    )}
                    inputMode="email"
                    required
                  />
                  <Field
                    label="Phone Number"
                    type="tel"
                    placeholder="+380 123 456 789"
                    icon={<PhoneIcon />}
                    value={phone}
                    onChange={(value) => setPhone(value.replace(/\D/g, ""))}
                    inputMode="numeric"
                    maxLength={12}
                  />
                </div>

                <div className="mx-auto mt-auto w-full max-w-[326px] pt-8 sm:max-w-[608px]">
                  <button
                    type="button"
                    disabled={!fullName.trim() || !emailIsValid(email)}
                    onClick={() => {
                      markTouched("fullName");
                      markTouched("signupEmail");
                      if (fullName.trim() && emailIsValid(email))
                        setSignupStep(3);
                    }}
                    className="mx-auto flex h-[44px] w-[205px] items-center justify-center gap-3 rounded-full bg-rose-100 text-[16px] font-semibold shadow-[0_3px_5px_rgba(0,0,0,0.12)] disabled:cursor-not-allowed disabled:opacity-50 sm:h-[48px] sm:w-full sm:text-[18px]"
                  >
                    Continue <ArrowRightIcon />
                  </button>
                  <button
                    type="button"
                    onClick={goBack}
                    className="mx-auto mt-4 flex items-center gap-2 text-[12px] text-silver-100 hover:text-forest-300"
                  >
                    <ArrowLeftIcon /> Back
                  </button>
                </div>
              </div>
            )}

            {signupStep === 3 && (
              <div className="flex flex-1 flex-col">
                <h2 className="mt-[40px] text-center font-pt-sans text-[30px] font-bold uppercase leading-none sm:mt-[54px] sm:text-[36px]">
                  Sign Up
                </h2>
                <div className="mx-auto mt-7 w-full max-w-[326px] space-y-4 sm:mt-14 sm:max-w-[608px]">
                  <Field
                    label="Password*"
                    type={showPassword ? "text" : "password"}
                    placeholder="8–16 characters"
                    icon={<LockIcon />}
                    value={password}
                    onChange={setPassword}
                    onBlur={() => markTouched("signupPassword")}
                    invalid={Boolean(
                      touched.signupPassword && !passwordIsValid(password),
                    )}
                    maxLength={16}
                    required
                    trailing={
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label="Toggle password visibility"
                      >
                        <EyeIcon hidden={!showPassword} />
                      </button>
                    }
                  />
                  <Field
                    label="Confirm Password*"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    icon={<LockIcon />}
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    onBlur={() => markTouched("confirmPassword")}
                    invalid={Boolean(
                      touched.confirmPassword && !confirmPasswordIsValid,
                    )}
                    maxLength={16}
                    required
                    trailing={
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((value) => !value)
                        }
                        aria-label="Toggle password visibility"
                      >
                        <EyeIcon hidden={!showConfirmPassword} />
                      </button>
                    }
                  />
                </div>

                {/* Error Message Display */}
                {apiError && (
                  <div className="mt-2 text-[14px] text-rose-300 text-center">
                    {apiError}
                  </div>
                )}

                <div className="mx-auto mt-auto w-full max-w-[326px] pt-8 sm:max-w-[608px]">
                  <button
                    type="button"
                    disabled={
                      !passwordIsValid(password) ||
                      !confirmPasswordIsValid ||
                      isLoading
                    }
                    onClick={handleRegisterSubmit}
                    className="mx-auto flex h-[44px] w-[205px] items-center justify-center rounded-full bg-rose-100 text-[16px] font-semibold shadow-[0_3px_5px_rgba(0,0,0,0.12)] disabled:cursor-not-allowed disabled:opacity-50 sm:h-[48px] sm:w-full sm:text-[18px]"
                  >
                    {isLoading ? "Processing..." : "Complete"}
                  </button>
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={isLoading}
                    className="mx-auto mt-4 flex items-center gap-2 text-[12px] text-silver-100 hover:text-forest-300 disabled:opacity-50"
                  >
                    <ArrowLeftIcon /> Back
                  </button>
                </div>
              </div>
            )}

            {signupStep === 4 && (
              <div className="flex flex-1 flex-col">
                <div className="mx-auto w-full max-w-[324px] pt-[88px] sm:max-w-[608px] sm:pt-[96px]">
                  <h2 className="mx-auto w-[267px] text-center font-pt-sans text-[36px] font-bold uppercase leading-[36px] sm:w-auto">
                    <span className="block">Thanks</span>
                    <span className="block">for signing up!</span>
                  </h2>

                  <p className="mt-6 text-justify text-[16px] font-normal leading-[16px] text-forest-300 sm:text-[18px] sm:leading-[18px]">
                    Welcome to the Fleunique family! Your account is ready,
                    unlocking seamless orders and playful perks. Remember that
                    special promo codes will appear in your profile after 5
                    orders or wholesale purchases. Dare to gift something truly
                    unique, spark vibrant joy with fearless floral magic, and
                    surprise extraordinary people with bold, breathtaking
                    creations.
                  </p>
                </div>

                <div className="mx-auto mt-[112px] w-full max-w-[608px]">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex h-[45px] w-full items-center justify-center rounded-[27px] bg-rose-100 text-[18px] font-semibold leading-none shadow-[0_2px_2px_rgba(61,59,59,0.20)]"
                  >
                    Order My First Bouquet
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <MobileAuthFooter />
      </div>
    </div>
  );
}
