import React, { useState, useContext, useEffect } from "react";

const PrivacyPolicy = () => {
 
  return (
    <>
      <div className='PrivacyPolicy'>
        <div class='container'>
          <h1> Privacy Policy</h1>

          <h5>Last Updated: January 20, 2025</h5>

          <h2>1. Introduction</h2>

          <p>
            Welcome to Vantcutz, a furniture tool app designed to provide
            furniture makers resources for creating cutlists for doors, kitchen
            cabinets, chairs and furniture items. At Vantcutz, your privacy and
            the security of your personal information are of utmost importance
            to us. This Privacy Policy outlines how we collect, use, disclose,
            and protect your information when you use our services. By using
            Vantcutz, you consent to the practices described in this policy.
          </p>

          <h2>2. Information We Collect</h2>

          <h4>2.1 PersonalInformation</h4>

          <p>
            We may collect personal information that you provide to us,
            including but not limited to
          </p>
          <ul>
            <li>Your name</li>
            <li>Email address (if you choose to upload one) </li>
            <li>Gender</li>
            <li>Profile picture (if you choose to upload one)</li>
            <li> Payment information (if you subscribe to premium services)</li>
          </ul>

          <h4>2.2 UsageInformation</h4>

          <p>
            We collect usage information about how you interact with the
            Vantcutz app, such as
          </p>
          <ul>
            <li>The content you access and download</li>
            <li>
              Your device information, including device type,operating
              system,and versior , IPaddress
            </li>
            <li>App version and usage statistics</li>
            <li>Log data and error reports</li>
          </ul>

          <h4>2.3 LocationPreferences</h4>
          <p>
            To personalize your experience, we may collect information about
            your location, to help suggest where to source materials for the
            items you have listed.
          </p>

          <h4>2.4 Third-Party Platforms</h4>
          <p>
            If you choose to log in to Vantcutz using third-party platforms,
            such as Facebook or Google, we may collect information from those
            platforms, subject to their privacy policies.
          </p>

          <h2>3. How We Use Your Information</h2>

          <h4>We use the information collected for the following purposes</h4>
          <p>
            To provide you with the Vantcutz service, including personalized
            content recommendations:
            <br />
            To improve and enhance our services, features, and user experience:
            <br />
            To communicate with you, including responding to your inquiries and
            providing customer support:
            <br />
            To send you important updates and information about the app and its
            features:
            <br />
            To conduct research and analysis to better understand user needs and
            preferences:
            <br />
            To enforce our Terms of Service and protect our legal rights:
            <br />
            To process payments (if applicable) for premium services you
            subscribe to.
          </p>

          <h2> 4. Information Sharing</h2>

          <p>
            We do not sell or rent your personal information to third parties.
            We may share your information in the following circumstances
          </p>

          <p>
            {' '}
            With trusted third-party service providers who help us operate and
            maintain the app (e.g., hosting, analytics, payment processing):
            <br />
            With your consent, such as when you choose to share your Vantcutz
            activity on social media platforms:
            <br />
            To comply with legal obligations, respond to lawful requests, or
            protect our rights, privacy, safety, or property:
            <br />
            In connection with a merger, acquisition, or sale of all or a
            portion of our assets, subject to confidentiality obligations.
          </p>

          <h2>5. Data Security</h2>

          <p>
            {' '}
            We implement reasonable security measures to protect your personal
            information from unauthorized access, disclosure, alteration, or
            destruction. However, no method of transmission or storage is
            entirely secure, and we cannot guarantee the security of your data.
          </p>

          <h2>6. YourChoices</h2>

          <p>You have the following choices regarding your information</p>
          <h5>Account Information:</h5>
          <p>
            {' '}
            You can update, correct, or delete your account information at any
            time within the app.
          </p>

          <h5> Marketing Communications:</h5>
          <p>
            You can unsubscribe from marketing communications at any time by
            following the instructions provided in the emails.
          </p>

          <h5> Data Collection Preferences:</h5>
          <p>
            {' '}
            You can choose to limit the data we collect through your device
            settings or app permissions.
          </p>

          <h2> 7. Children's Privacy</h2>

          <p>
            {' '}
            Vantcutz is intended for users who are at least 18 years old. We do
            not knowingly collect personal information from children under the
            age of 13. If you believe a child has provided us with their
            information without parental consent, please contact us, and we will
            take appropriate steps to delete that information.
          </p>

          <h2>8. Changes to this Privacy Policy</h2>

          <p>
            {' '}
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We will notify you of any material changes by
            posting the updated policy within the app or through other means.
          </p>

          <h2> 9. Contact Us</h2>

          <p>
            {' '}
            If you have any questions, concerns, or requests related to this
            Privacy Policy or your personal information, please contact us at
            contact@Vantcutz.com
          </p>

          <p>
            Thank you for trusting Vantcutz with your mental health and
            well-being. We are committed to maintaining your privacy and
            providing you with a safe and secure environment to relax, heal, and
            thrive.
          </p>

          <div class='footer margin60' id='footer_side'></div>
        </div>
      </div>
    </>
  )
}


export default PrivacyPolicy;