import CreateVirtualCardForm from "../../components/userPages/CreateVirtualCardForm";

const CreateVirtualCard = () => {
    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Submit logic here
    };

    return (
        <div className="container mx-auto p-6 w-full rounded-lg">
            <h1 className="md:text-4xl text-2xl text-center text-gray-400">
                Visual Card Application
            </h1>
            <p className="text-lg text-center text-gray-400 mb-7">
                The virtual card is issued instantly when requested. To request,
                Fill in the form below
            </p>

            <div className="p-7 bg-gray-900 space-y-5">
                <CreateVirtualCardForm handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default CreateVirtualCard;
