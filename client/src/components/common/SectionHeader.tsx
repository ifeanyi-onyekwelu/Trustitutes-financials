interface Props {
    h3Text: string;
    h1Text: string;
    align?: string;
}

const SectionHeader = ({ h3Text, h1Text, align = "center" }: Props) => {
    return (
        <div
            className={`text-${align} py-4 flex items-${align} flex-col space-y-3 mb-3`}
        >
            <h3 className="text-lg font-bold text-gray-500">{h3Text}</h3>
            <h1 className="text-2xl md:text-5xl font-black text-text w-full">
                {h1Text}
            </h1>
        </div>
    );
};

export default SectionHeader;
