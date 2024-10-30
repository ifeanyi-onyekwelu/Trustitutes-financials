import Hero from "../../shared/Hero";
import "../../styles/TermsCondition.scss";

const TermsCondition = () => {
    return (
        <>
            <Hero pageTitle="Terms condition" />

            <section id="terms-and-conditions">
                <div className="container">
                    <h1>
                        WE'RE ALWAYS LOOKING FOR NEW WAYS TO PROVIDE PRIVACY FOR
                        OUR CUSTOMERS.
                    </h1>
                    <p>
                        These Terms and Conditions ("Terms") govern your use of
                        the Platform, so please read them carefully. By
                        accessing or using the Platform, you agree to be bound
                        by these Terms. If you do not agree with any part of
                        these Terms, you may not access the Platform.
                    </p>

                    <span>Services</span>
                    <ul>
                        <li>
                            {" "}
                            - The Platform offers [brief description of services
                            offered].
                        </li>
                        <li>
                            {" "}
                            - We reserve the right to modify, suspend, or
                            discontinue any part of the Platform at any time
                            without notice
                        </li>
                    </ul>

                    <span>Account Registration</span>
                    <ul>
                        <li>
                            {" "}
                            - In order to access certain features of the
                            Platform, you may be required to create an account.
                            You agree to provide accurate, current, and complete
                            information during the registration process.
                        </li>
                        <li>
                            {" "}
                            - You are solely responsible for maintaining the
                            confidentiality of your account and password and for
                            restricting access to your account. You agree to
                            accept responsibility for all activities that occur
                            under your account.
                        </li>
                    </ul>

                    <span>User Conduct</span>
                    <ul>
                        <li>
                            {" "}
                            - You agree not to use the Platform for any unlawful
                            purpose or in any way that violates these Terms.
                        </li>
                        <li>
                            {" "}
                            - You agree not to harass, abuse, or harm other
                            users of the Platform.
                        </li>
                    </ul>

                    <span>Intellectual Property</span>
                    <ul>
                        <li>
                            {" "}
                            - All content on the Platform, including but not
                            limited to text, graphics, logos, button icons,
                            images, audio clips, digital downloads, data
                            compilations, and software, is the property of [Your
                            Company Name] or its content suppliers and is
                            protected by copyright laws.
                        </li>
                        <li>
                            {" "}
                            - You may not reproduce, distribute, display, or
                            create derivative works of any content on the
                            Platform without our prior written consent.
                        </li>
                    </ul>

                    <span>Limitation of Liability</span>
                    <ul>
                        <li>
                            {" "}
                            - We make no warranties or representations about the
                            accuracy or completeness of the content on the
                            Platform.
                        </li>
                        <li>
                            {" "}
                            - To the fullest extent permitted by law, we shall
                            not be liable for any direct, indirect, incidental,
                            special, or consequential damages arising out of or
                            in connection with your use of the Platform.
                        </li>
                    </ul>

                    <span>Governing Law</span>
                    <ul>
                        <li>
                            {" "}
                            - These Terms shall be governed by and construed in
                            accordance with the laws of [Your Jurisdiction].
                        </li>
                    </ul>

                    <span>Changes to Terms</span>
                    <ul>
                        <li>
                            {" "}
                            - We reserve the right to modify these Terms at any
                            time without notice. Your continued use of the
                            Platform after any such changes constitutes your
                            acceptance of the new Terms.
                        </li>
                    </ul>

                    <span>Contact Us</span>
                    <ul>
                        <li>
                            {" "}
                            - If you have any questions about these Terms,
                            please contact us at [Your Contact Information].
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default TermsCondition;
