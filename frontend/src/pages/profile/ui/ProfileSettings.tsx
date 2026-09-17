import { SettingsForm } from "@/widgets/settings-form";

export const ProfileSettings = () => {
  return (
    <div className="w-full">
      <h1 className="font-pt-sans font-bold text-headline-3 uppercase text-forest-400 mb-8">
        Profile Settings
      </h1>
      <SettingsForm />
    </div>
  );
};
