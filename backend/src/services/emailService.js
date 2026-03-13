const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


exports.sendInterviewEmail = async (
  candidateEmail,
  candidateName,
  role,
  interviewDate
) => {

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: candidateEmail,
    subject: "Interview Invitation",
    html: `
      <h3>Hello ${candidateName},</h3>
      <p>You have been shortlisted for the role of <b>${role}</b>.</p>
      <p>Your interview is scheduled on <b>${interviewDate}</b>.</p>
      <p>Please confirm your availability.</p>
      <br/>
      <p>Regards,</p>
      <p>Recruitment Team</p>
    `
  };

  await transporter.sendMail(mailOptions);
};