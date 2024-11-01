import ProfileForm from "../../components/userPages/ProfileForm";

const Profile = () => {
    return (
        <div className="container mx-auto p-6 w-full rounded-lg">
            <h1 className="md:text-4xl text-2xl text-center text-gray-100 font-bold">
                Update Your Profile Information
            </h1>

            <p className="text-lg text-center text-gray-300 mb-7">
                Keep your profile up-to-date to ensure a seamless experience.
                Fill in the details below to manage your personal information
                and settings.
            </p>

            <div className="p-7 bg-gray-900 space-y-5">
                <ProfileForm />
            </div>
        </div>
    );
};

export default Profile;
