import BreadcrumbBg from "../../assets/img/breadcrumb-bg.avif";
import { Link } from "react-router-dom";

interface Props {
    pageTitle: string;
    page: string;
}

function BreadcrumbSection({ pageTitle, page }: Props) {
    return (
        <section id="hero" className="py-12">
            <div className="relative bg-primary text-white">
                {/* Background Image (Optional) */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70 "
                    style={{
                        backgroundImage: `url('${BreadcrumbBg}')`,
                    }}
                >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-50"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center py-20 px-4 text-center lg:py-32">
                    {/* Title */}
                    <h1 className="text-4xl font-bold lg:text-5xl text-shadow">
                        {pageTitle}
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-4 text-sm lg:text-lg flex gap-3">
                        <Link to={"/"}>Home</Link> / <span>{page}</span>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default BreadcrumbSection;
