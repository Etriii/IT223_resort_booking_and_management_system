import { useEffect } from 'react';
import UserLayout from '../../layouts/UserLayout';

const TermsAndPrivacy = () => {
    useEffect(() => {
        document.title = "Terms and Privacy | Ocean View";
    }, []);
    return (
        <main className="max-w-5xl mx-auto p-6 sm:p-10 text-gray-900 bg-white min-h-screen font-sans">
            <h1 className="text-4xl font-serif font-bold mb-8 text-center text-amber-900">
                Terms of Service & Privacy Policy
            </h1>

            {/* Terms of Service */}
            <section className="mb-16">
                <h2 className="text-3xl font-semibold mb-4 text-amber-900">Terms of Service</h2>
                <p className="mb-6 text-gray-700">Effective Date: May 20, 2025</p>

                <p className="mb-4">
                    Welcome to Ocean View. These Terms of Service (“Terms”) govern your access to and use of our website, services, and products.
                    By accessing or using Ocean View, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our services.
                </p>

                <ol className="list-decimal list-inside space-y-4 text-gray-700">
                    <li>
                        <strong>Use of Our Services</strong><br />
                        You agree to use our services only for lawful purposes and in accordance with these Terms. You must not use the service in any way that causes, or may cause, damage to the website or impairment of availability or accessibility.
                    </li>
                    <li>
                        <strong>User Accounts</strong><br />
                        To access certain features, you may be required to create an account. You agree to provide accurate, current, and complete information when registering, and to update it as necessary. You are responsible for safeguarding your account credentials and for any activity conducted through your account.
                    </li>
                    <li>
                        <strong>Reservations and Payments</strong><br />
                        All bookings made through Ocean View are subject to availability and confirmation. Payments are processed securely, and you agree to provide accurate payment information. Cancellation and refund policies will be detailed separately at the point of booking.
                    </li>
                    <li>
                        <strong>Intellectual Property</strong><br />
                        All content, including but not limited to text, graphics, logos, images, and software, is the property of Ocean View or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without explicit permission.
                    </li>
                    <li>
                        <strong>Limitation of Liability</strong><br />
                        To the maximum extent permitted by law, Ocean View shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of or related to your use of our services.
                    </li>
                    <li>
                        <strong>Termination</strong><br />
                        We reserve the right to suspend or terminate your access to the service at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users.
                    </li>
                    <li>
                        <strong>Changes to Terms</strong><br />
                        We may modify these Terms at any time. Changes will be posted on this page with an updated effective date. Continued use of our services after changes constitute your acceptance of the new Terms.
                    </li>
                    <li>
                        <strong>Governing Law</strong><br />
                        These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Ocean View operates.
                    </li>
                    <li>
                        <strong>Contact Us</strong><br />
                        For any questions or concerns regarding these Terms, please contact us at support@oceanview.com.
                    </li>
                </ol>
            </section>

            {/* Privacy Policy */}
            <section>
                <h2 className="text-3xl font-semibold mb-4 text-amber-900">Privacy Policy</h2>
                <p className="mb-6 text-gray-700">Effective Date: May 20, 2025</p>

                <p className="mb-4">
                    Ocean View (“we”, “us”, “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-amber-800">1. Information We Collect</h3>
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                    <li>
                        <strong>Personal Information</strong><br />
                        We collect personal information that you voluntarily provide when you create an account, make a reservation, or contact us. This may include your name, email address, phone number, payment information, and other details relevant to your stay or service request.
                    </li>
                    <li>
                        <strong>Usage Data</strong><br />
                        We collect information automatically when you access our website, such as IP address, browser type, pages visited, and other diagnostic data.
                    </li>
                    <li>
                        <strong>Cookies and Tracking Technologies</strong><br />
                        We use cookies and similar tracking technologies to enhance your experience, analyze usage, and deliver personalized content.
                    </li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-amber-800">2. How We Use Your Information</h3>
                <p className="mb-4 text-gray-700">
                    We use your information to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li>Provide, operate, and maintain our services</li>
                    <li>Process transactions and send you related information</li>
                    <li>Communicate with you about updates, promotions, and support</li>
                    <li>Personalize your experience</li>
                    <li>Monitor and analyze usage and trends</li>
                    <li>Comply with legal obligations</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-amber-800">3. Sharing Your Information</h3>
                <p className="mb-4 text-gray-700">
                    We do not sell your personal data. We may share your information with trusted third-party service providers who assist us in operating our website and delivering services, subject to confidentiality agreements. We may also disclose information to comply with legal requirements or protect our rights.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-amber-800">4. Data Security</h3>
                <p className="mb-4 text-gray-700">
                    We implement reasonable security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-amber-800">5. Your Rights and Choices</h3>
                <p className="mb-4 text-gray-700">
                    Depending on your jurisdiction, you may have rights to access, correct, or delete your personal data. You can update your account information or opt out of marketing communications by contacting us.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-amber-800">6. Retention of Data</h3>
                <p className="mb-4 text-gray-700">
                    We retain your personal data only as long as necessary to provide services and fulfill legal obligations.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-amber-800">7. Children’s Privacy</h3>
                <p className="mb-4 text-gray-700">
                    Our services are not directed to individuals under 18 years old. We do not knowingly collect personal information from children under 18.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-amber-800">8. Changes to This Privacy Policy</h3>
                <p className="mb-4 text-gray-700">
                    We may update this Privacy Policy periodically. We will notify you of any changes by posting the new policy on this page with a revised effective date.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-amber-800">9. Contact Us</h3>
                <p className="mb-4 text-gray-700">
                    If you have questions about this Privacy Policy or your data, please contact us at privacy@oceanview.com.
                </p>
            </section>
        </main>
    );
}

export default TermsAndPrivacy;