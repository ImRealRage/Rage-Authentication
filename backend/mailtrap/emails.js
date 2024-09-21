import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email:", error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "34cac558-3baf-4897-901f-00006b12656b",
      template_variables: {
        company_info_name: "Rage Authentication",
        name: name,
      },
    });
    console.log("Welcome Email sent successfully:", response);
  } catch (error) {}
};
