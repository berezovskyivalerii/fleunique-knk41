import { SettingsForm } from "@/widgets/settings-form";

export const ProfileSettings = () => {
  return (
    <div className="w-full max-w-[736px]">
      <h2 className="font-pt-sans font-bold text-[28px] leading-none sm:text-headline-2 uppercase text-forest-300 mb-6 text-center">
        Profile Settings
      </h2>
      <SettingsForm />
    </div>
  );
};
