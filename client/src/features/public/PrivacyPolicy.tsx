import Hero from "../../shared/Hero";
import "../../styles/PrivacyPolicy.scss";

const PrivacyPolicy = () => {
    return (
        <>
            <Hero pageTitle="Privacy Policy" />

            <section id="privacy-policy">
                <div className="container">
                    <p>
                        This Privacy Policy governs the manner in which PayFox
                        collects, uses, maintains, and discloses information
                        collected from users (each, a "User") of the [Your
                        Website URL] website ("Site"). This privacy policy
                        applies to the Site and all products and services
                        offered by PayFox
                    </p>

                    <span>Personal Information Collection</span>
                    <ul>
                        <li>
                            We collect personal details provided by you to offer
                            our services. This may include but is not limited
                            to, your name, email address, mailing address, phone
                            number, or other details.
                        </li>
                    </ul>

                    <span>Usage of Information</span>
                    <ul>
                        <li>
                            Your information is used to personalize your
                            experience and improve customer service. This may
                            include tailoring the content of our website or
                            other communications to better suit your needs,
                            responding to your customer service requests and
                            support needs more efficiently, or improving our
                            products and services based on your feedback.
                        </li>
                    </ul>

                    <span>Protection of Information</span>
                    <ul>
                        <li>
                            We implement security measures to protect your
                            personal information from unauthorized access,
                            alteration, disclosure, or destruction. These
                            measures include but are not limited to, encryption
                            of data in transit and at rest, regular security
                            assessments, and access controls to limit access to
                            your personal information to only those who need it
                            to perform their duties
                        </li>
                    </ul>

                    <span>Information Sharing</span>
                    <ul>
                        <li>
                            We do not sell, trade, or rent users' personal
                            identification information to others. We may share
                            generic aggregated demographic information not
                            linked to any personal identification information
                            regarding visitors and users with our business
                            partners, trusted affiliates, and advertisers for
                            the purposes outlined above
                        </li>
                    </ul>

                    <span>Changes to this Privacy Policy</span>
                    <ul>
                        <li>
                            PayFox has the discretion to update this privacy
                            policy at any time. When we do, we will revise the
                            updated date at the bottom of this page. We
                            encourage Users to frequently check this page for
                            any changes to stay informed about how we are
                            helping to protect the personal information we
                            collect. You acknowledge and agree that it is your
                            responsibility to review this privacy policy
                            periodically and become aware of modification
                        </li>
                    </ul>

                    <span>Your Acceptance of These Terms</span>
                    <ul>
                        <li>
                            By using this Site, you signify your acceptance of
                            this policy. If you do not agree to this policy,
                            please do not use our Site. Your continued use of
                            the Site following the posting of changes to this
                            policy will be deemed your acceptance of those
                            changes.
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default PrivacyPolicy;
