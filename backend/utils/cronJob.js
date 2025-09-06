const cron = require("node-cron");
const Borrow = require("../models/borrow");
const User = require("../models/users");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"Library System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (err) {
    console.error("Error sending email:", err.message);
  }
};

cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Running daily borrow & membership check...");

  const now = new Date();

  try {
    const borrows = await Borrow.find({ status: "borrowed" }).populate(
      "user book"
    );

    for (const borrow of borrows) {
      if (!borrow.duedate) continue;

      const due = new Date(borrow.duedate);

      if (due < now && !borrow.overdue) {
        borrow.overdue = true;
        await borrow.save();

        await sendEmail(
          borrow.user.email,
          "Overdue Book Notice",
          `Dear ${borrow.user.firstName},\n\nYour borrowed book "${borrow.book.title}" is now OVERDUE.\nPlease return it as soon as possible.`
        );
      }

      const diffDays = Math.floor((due - now) / (1000 * 60 * 60 * 24));
      if (diffDays === 3 && !borrow.reminderSent) {
        await sendEmail(
          borrow.user.email,
          "Book Due Reminder",
          `Dear ${borrow.user.firstName},\n\nReminder: Your borrowed book "${
            borrow.book.title
          }" is due in 3 days (on ${due.toDateString()}).\nPlease return it on time to avoid penalties.`
        );

        borrow.reminderSent = true;
        await borrow.save();
      }
    }

    console.log("Borrow due/overdue checks completed.");

    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(now.getDate() + 3);

    const usersExpiringSoon = await User.find({
      is_member: true,
      expiryDate: { $gte: now, $lte: threeDaysFromNow },
      membershipReminderSent: { $ne: true },
    });

    for (const user of usersExpiringSoon) {
      await sendEmail(
        user.email,
        "Membership Expiry Reminder",
        `Dear ${
          user.firstName
        },\n\nYour membership will expire in 3 days (${user.expiryDate.toDateString()}). Please renew your membership to continue enjoying our services.`
      );

      user.membershipReminderSent = true;
      await user.save();
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const usersExpiringToday = await User.find({
      is_member: true,
      expiryDate: { $gte: startOfToday, $lte: endOfToday },
      membershipExpiryNotified: { $ne: true },
    });

    for (const user of usersExpiringToday) {
      await sendEmail(
        user.email,
        "Membership Expiry Today",
        `Dear ${
          user.firstName
        },\n\nYour membership expires today (${user.expiryDate.toDateString()}). Please renew it to continue enjoying our services.`
      );

      user.membershipExpiryNotified = true;
      await user.save();
    }

    console.log("Membership expiry checks completed.");
  } catch (err) {
    console.error("Error in cron job:", err.message);
  }
});

console.log("Cron job for overdue checks & reminders initialized");
