import Breadcrumb from "../../components/common/BreadcrumbSection";
import SectionHeader from "../../components/common/SectionHeader";
import AllServicesCardGrid from "../../components/services/AllCardGrid";

const Services = () => {
    return (
        <>
            <Breadcrumb pageTitle="Our Financial Services" page="Services" />
            <section className="py-2 md:py-10">
                <div className="md:space-x-5 md:space-y-0 space-y-5">
                    <SectionHeader
                        h3Text="OUR SERVICES"
                        h1Text="Our Banking Services"
                        align="center"
                    />

                    <AllServicesCardGrid />
                </div>
            </section>
        </>
    );
};

export default Services;
