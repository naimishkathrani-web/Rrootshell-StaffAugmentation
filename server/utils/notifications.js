const nodemailer = require('nodemailer');
const { Contract, PurchaseOrder, Resource, User } = require('../models');
const { Op } = require('sequelize');

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Send email notification
async function sendEmail(to, subject, html) {
  try {
    if (!process.env.SMTP_USER) {
      console.log('Email notification skipped - SMTP not configured');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      return;
    }

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html
    });
    console.log(`Email sent to ${to}: ${subject}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Check for expiring contracts and send notifications
async function checkExpiringContracts() {
  try {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const expiringContracts = await Contract.findAll({
      where: {
        endDate: {
          [Op.lte]: thirtyDaysFromNow,
          [Op.gte]: new Date()
        },
        status: 'active',
        notificationSent: false
      },
      include: [{ model: Resource }]
    });

    const directors = await User.findAll({
      where: { role: 'director', isActive: true }
    });

    for (const contract of expiringContracts) {
      const daysUntilExpiry = Math.ceil((new Date(contract.endDate) - new Date()) / (1000 * 60 * 60 * 24));
      
      const html = `
        <h2>Contract Expiring Soon</h2>
        <p>The following contract is expiring in ${daysUntilExpiry} days:</p>
        <ul>
          <li><strong>Client:</strong> ${contract.clientName}</li>
          <li><strong>Contract Number:</strong> ${contract.contractNumber}</li>
          <li><strong>End Date:</strong> ${new Date(contract.endDate).toLocaleDateString()}</li>
          <li><strong>Value:</strong> $${contract.value}</li>
          <li><strong>Resources:</strong> ${contract.Resources?.length || 0}</li>
        </ul>
        <p>Please take necessary action to renew this contract.</p>
      `;

      for (const director of directors) {
        await sendEmail(
          director.email,
          `Contract Expiring: ${contract.clientName}`,
          html
        );
      }

      await contract.update({ notificationSent: true });
    }

    console.log(`Checked ${expiringContracts.length} expiring contracts`);
  } catch (error) {
    console.error('Error checking expiring contracts:', error);
  }
}

// Check for expiring purchase orders and send notifications
async function checkExpiringPurchaseOrders() {
  try {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const expiringPOs = await PurchaseOrder.findAll({
      where: {
        endDate: {
          [Op.lte]: thirtyDaysFromNow,
          [Op.gte]: new Date()
        },
        status: 'active',
        notificationSent: false
      },
      include: [
        { model: Resource },
        { model: Contract }
      ]
    });

    const directors = await User.findAll({
      where: { role: 'director', isActive: true }
    });

    for (const po of expiringPOs) {
      const daysUntilExpiry = Math.ceil((new Date(po.endDate) - new Date()) / (1000 * 60 * 60 * 24));
      
      const html = `
        <h2>Purchase Order Expiring Soon</h2>
        <p>The following purchase order is expiring in ${daysUntilExpiry} days:</p>
        <ul>
          <li><strong>PO Number:</strong> ${po.poNumber}</li>
          <li><strong>Resource:</strong> ${po.Resource?.name}</li>
          <li><strong>Contract:</strong> ${po.Contract?.contractNumber} - ${po.Contract?.clientName}</li>
          <li><strong>End Date:</strong> ${new Date(po.endDate).toLocaleDateString()}</li>
          <li><strong>Value:</strong> $${po.value}</li>
        </ul>
        <p>Please take necessary action to renew this purchase order.</p>
      `;

      for (const director of directors) {
        await sendEmail(
          director.email,
          `Purchase Order Expiring: ${po.poNumber}`,
          html
        );
      }

      await po.update({ notificationSent: true });
    }

    console.log(`Checked ${expiringPOs.length} expiring purchase orders`);
  } catch (error) {
    console.error('Error checking expiring purchase orders:', error);
  }
}

// Run all checks
async function runNotificationChecks() {
  console.log('Running notification checks...');
  await checkExpiringContracts();
  await checkExpiringPurchaseOrders();
  console.log('Notification checks completed');
}

module.exports = {
  sendEmail,
  checkExpiringContracts,
  checkExpiringPurchaseOrders,
  runNotificationChecks
};
