import { SettingsForm } from "@/widgets/settings-form";

export const ProfileSettings = () => {
  return (
    <div className="w-full lg:max-w-[736px]">
      <h2 className="font-pt-sans font-bold text-headline-3 md:text-headline-2 leading-none uppercase text-forest-300 mb-6 text-center lg:text-left">
        Profile Settings
      </h2>
      <SettingsForm />
    </div>
  );
};
