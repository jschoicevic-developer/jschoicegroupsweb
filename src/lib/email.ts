/**
 * Email Notification System
 * Handles sending email notifications for CRM events
 */

import { Resend } from 'resend';
import { Lead } from '@/types/crm';

const resend = new Resend(process.env.RESEND_API_KEY);

const SOURCE_LABELS: Record<string, string> = {
  contact_form: 'Contact Form',
  service_matcher: 'Service Matcher',
  budget_calculator: 'Budget Calculator',
  blog_subscription: 'Blog Subscription',
  referral: 'Referral',
  phone: 'Phone',
  walk_in: 'Walk-in',
  other: 'Other',
};

// Brand Colors
const COLORS = {
  primary: '#ABB3F1',
  secondary: '#F1ABAB',
  background: '#F7FAFC',
  text: '#1A202C',
  textLight: '#718096',
  white: '#FFFFFF',
  border: '#E2E8F0',
  success: '#68D391'
};

/**
 * Send notification email when a new lead is received
 */
export async function sendNewLeadNotification(lead: Lead): Promise<void> {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://jschoice-website.vercel.app';
    const sourceLabel = SOURCE_LABELS[lead.source] || lead.source;
    const fullName = `${lead.first_name} ${lead.last_name || ''}`.trim();
    const adminEmail = process.env.ADMIN_EMAIL || 'jschoice.au@gmail.com';

    await resend.emails.send({
      from: 'JS Choice CRM <onboarding@resend.dev>',
      to: adminEmail,
      subject: `🔔 New Lead: ${fullName} from ${sourceLabel}`,
      html: generateNewLeadEmailHtml(lead, appUrl, sourceLabel, fullName),
    });

    console.log(`✅ Notification sent for lead: ${lead.id}`);
  } catch (error) {
    console.error('❌ Failed to send notification email:', error);
    // Don't throw - email failure shouldn't break lead creation
  }
}

/**
 * Send confirmation email to client
 */
export async function sendClientConfirmation(lead: Lead): Promise<void> {
  const fullName = `${lead.first_name} ${lead.last_name || ''}`.trim();
  const adminEmail = process.env.ADMIN_EMAIL || 'jschoice.au@gmail.com';

  // 1. Try sending real email (Requires Verified Domain)
  // using the production domain sender
  const { error: realError } = await resend.emails.send({
    from: 'JS Choice Group <info@jschoicegroup.com.au>',
    to: lead.email,
    subject: 'Thank you for contacting JS Choice Group',
    html: generateClientConfirmationHtml(lead, fullName),
  });

  if (!realError) {
    console.log(`✅ Client confirmation sent to: ${lead.email}`);
    return;
  }

  console.log(`⚠️ Note: Could not send directly to client (${lead.email}) from verified domain. Trying via Resend Sandbox...`);

  // 2. Fallback: Send to Client via Resend Sandbox (onboarding@resend.dev)
  // This works if the lead.email is verified in Resend (e.g. for testing)
  try {
    await resend.emails.send({
      from: 'JS Choice Group <onboarding@resend.dev>',
      to: lead.email,
      subject: 'Thank you for contacting JS Choice Group',
      html: generateClientConfirmationHtml(lead, fullName),
    });
    console.log(`✅ Sandbox confirmation sent to client: ${lead.email}`);
    return;
  } catch (sandboxError) {
    console.warn(`⚠️ Failed to send to client via Sandbox (Client email likely unverified). Fallback to Admin Copy.`);
  }

  // 3. Final Fallback: Send Copy to Admin
  try {
    await resend.emails.send({
      from: 'JS Choice Group <onboarding@resend.dev>',
      to: adminEmail,
      subject: `[Client Copy] Context: ${lead.email} - Thank you for contacting JS Choice Group`,
      html: generateClientConfirmationHtml(lead, fullName),
    });
    console.log(`✅ Admin received client copy: ${adminEmail}`);
  } catch (finalError) {
    console.error('❌ Failed to send client confirmation (all methods):', finalError);
  }
}

/**
 * Generate HTML for client confirmation email
 */
function generateClientConfirmationHtml(lead: Lead, fullName: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting JS Choice Group</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: ${COLORS.background}; color: ${COLORS.text};">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: ${COLORS.white}; border-radius: 8px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <tr>
          <td align="center" style="padding: 40px 0; background-color: ${COLORS.primary}; background-image: linear-gradient(135deg, ${COLORS.primary} 0%, #9FA8E8 100%);">
            <h1 style="color: ${COLORS.text}; font-size: 28px; font-weight: 700; margin: 0; text-shadow: 0 1px 2px rgba(255,255,255,0.2);">JS Choice Group</h1>
            <p style="color: ${COLORS.text}; margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Empowering Lives, Enhancing Choices</p>
          </td>
        </tr>
        
        <!-- Welcome Message -->
        <tr>
          <td style="padding: 40px 30px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hi <strong>${lead.first_name}</strong>,</p>
            
            <p style="font-size: 16px; line-height: 1.6; color: ${COLORS.textLight}; margin-bottom: 20px;">
              Thank you for reaching out to <strong>JS Choice Group</strong>. We have successfully received your inquiry and our team is already reviewing it.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: ${COLORS.textLight}; margin-bottom: 30px;">
              One of our care coordinators will be in touch with you shortly to discuss how we can support you or your loved ones.
            </p>

            ${lead.message ? `
            <!-- Client Message Recap -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${COLORS.background}; border-radius: 8px; margin-bottom: 30px;">
              <tr>
                <td style="padding: 20px;">
                  <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: ${COLORS.textLight}; font-weight: bold; margin-bottom: 10px;">Your Message</p>
                  <p style="margin: 0; font-style: italic; color: ${COLORS.text}; line-height: 1.5;">"${lead.message.replace(/\n/g, '<br>')}"</p>
                </td>
              </tr>
            </table>
            ` : ''}

            <!-- Contact Info -->
            <div style="border-top: 1px solid ${COLORS.border}; padding-top: 30px; margin-top: 30px;">
              <p style="font-size: 16px; margin-bottom: 15px; color: ${COLORS.text};">Need urgent assistance?</p>
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right: 20px;">
                    <a href="tel:1300572464" style="display: inline-block; background-color: ${COLORS.secondary}; color: ${COLORS.text}; text-decoration: none; font-weight: bold; padding: 12px 24px; border-radius: 50px;">
                      📞 1300 572 464
                    </a>
                  </td>
                </tr>
              </table>
            </div>

             <div style="margin-top: 30px; font-size: 14px; color: ${COLORS.textLight};">
              <p style="margin: 0;"><strong>Office Hours:</strong> 8:00 AM - 6:00 PM</p>
              <p style="margin: 5px 0 0 0;"><strong>Care Services:</strong> 24/7 Available</p>
            </div>
          </td>
        </tr>
        
        <!-- Footer -->
        <tr>
          <td style="background-color: #F7FAFC; padding: 30px; text-align: center; border-top: 1px solid ${COLORS.border};">
            <p style="font-size: 14px; color: ${COLORS.textLight}; margin-bottom: 10px;">&copy; ${new Date().getFullYear()} JS Choice Group. All rights reserved.</p>
            <p style="font-size: 12px; color: #A0AEC0;">
              Suite 106, Level 1, C5, 2 Main Street, Point Cook VIC 3030<br>
              <a href="mailto:info@jschoicegroup.com.au" style="color: ${COLORS.primary}; text-decoration: none;">info@jschoicegroup.com.au</a>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Generate HTML for new lead notification email (Admin)
 */
function generateNewLeadEmailHtml(
  lead: Lead,
  appUrl: string,
  sourceLabel: string,
  fullName: string
): string {

  // Format details for table
  const details = [
    { label: 'Name', value: fullName },
    { label: 'Email', value: `<a href="mailto:${lead.email}" style="color: #4A5568; text-decoration: none;">${lead.email}</a>` },
    { label: 'Phone', value: lead.phone ? `<a href="tel:${lead.phone}" style="color: #4A5568; text-decoration: none;">${lead.phone}</a>` : '-' },
    { label: 'Source', value: `<span style="background-color: ${COLORS.secondary}30; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${sourceLabel}</span>` },
    { label: 'Location', value: lead.location ? `${lead.location}, ${lead.state || 'VIC'}` : '-' },
    { label: 'NDIS Status', value: lead.ndis_status || '-' },
    { label: 'Interested Services', value: lead.interested_services?.join(', ') || '-' },
    { label: 'Priority', value: `<strong style="color: ${lead.priority === 'urgent' ? '#E53E3E' : lead.priority === 'high' ? '#D69E2E' : '#3182CE'}">${lead.priority.toUpperCase()}</strong>` }
  ];

  const sourceDetailsHtml = lead.source_details && Object.keys(lead.source_details).length > 0
    ? `
      <tr>
        <td colspan="2" style="padding: 20px 0 10px 0;">
          <h3 style="margin: 0; color: ${COLORS.primary}; font-size: 16px; border-bottom: 2px solid ${COLORS.primary}; padding-bottom: 8px;">Consultations / Extra Details</h3>
        </td>
      </tr>
      ${Object.entries(lead.source_details).map(([key, value]) => `
      <tr>
        <td style="padding: 12px 15px; border-bottom: 1px solid ${COLORS.border}; background-color: #F8FAFC; color: ${COLORS.textLight}; font-weight: 600; font-size: 13px; width: 35%;">
          ${key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').toUpperCase()}
        </td>
        <td style="padding: 12px 15px; border-bottom: 1px solid ${COLORS.border}; color: ${COLORS.text}; font-size: 14px;">
          ${Array.isArray(value) ? value.join(', ') : (value?.toString() || '-')}
        </td>
      </tr>
      `).join('')}
    `
    : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Lead Notification</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: ${COLORS.background}; color: ${COLORS.text};">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: ${COLORS.white}; border-radius: 8px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <tr>
          <td style="padding: 20px 30px; background-color: ${COLORS.primary}; border-bottom: 4px solid ${COLORS.secondary};">
             <table border="0" cellpadding="0" cellspacing="0" width="100%">
               <tr>
                 <td>
                   <h2 style="margin: 0; color: ${COLORS.text}; font-size: 20px;">🚀 New Lead Received</h2>
                 </td>
                 <td align="right">
                   <div style="background-color: rgba(255,255,255,0.3); padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 12px; color: ${COLORS.text};">
                     ${new Date().toLocaleDateString()}
                   </div>
                 </td>
               </tr>
             </table>
          </td>
        </tr>

        <!-- Main Content -->
        <tr>
          <td style="padding: 30px;">
            
            <!-- Lead Details Table -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: separate; border-spacing: 0; border: 1px solid ${COLORS.border}; border-radius: 8px; overflow: hidden;">
              ${details.map(item => `
              <tr>
                <td style="padding: 12px 15px; border-bottom: 1px solid ${COLORS.border}; background-color: #F8FAFC; color: ${COLORS.textLight}; font-weight: 600; font-size: 13px; width: 35%;">
                  ${item.label}
                </td>
                <td style="padding: 12px 15px; border-bottom: 1px solid ${COLORS.border}; color: ${COLORS.text}; font-size: 14px;">
                  ${item.value}
                </td>
              </tr>
              `).join('')}
              ${sourceDetailsHtml}
            </table>

            ${lead.message ? `
            <!-- Message Box -->
            <div style="margin-top: 25px;">
              <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: ${COLORS.textLight}; font-weight: bold; margin-bottom: 10px;">Message from Lead</p>
              <div style="background-color: #F0F4F8; padding: 15px; border-radius: 6px; border-left: 4px solid ${COLORS.primary}; color: ${COLORS.text}; font-style: italic; line-height: 1.5;">
                "${lead.message.replace(/\n/g, '<br>')}"
              </div>
            </div>
            ` : ''}

            <!-- CTA Button -->
            <div style="margin-top: 30px; text-align: center;">
              <a href="${appUrl}/admin/login" style="display: inline-block; background-color: ${COLORS.text}; color: ${COLORS.white}; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                View Full Lead in CRM →
              </a>
              <p style="margin-top: 15px; font-size: 12px; color: ${COLORS.textLight};">
                Lead ID: <span style="font-family: monospace;">${lead.id}</span>
              </p>
            </div>

          </td>
        </tr>
      </table>
      
      <!-- Footer -->
      <div style="text-align: center; font-size: 12px; color: ${COLORS.textLight}; margin-bottom: 30px;">
        <p>This is an automated notification from JS Choice CRM.</p>
      </div>
    </body>
    </html>
  `;
}

/**
 * Send follow-up reminder email
 */
export async function sendFollowUpReminder(
  lead: Lead,
  assignedUserEmail: string,
  dueDate: string,
  note?: string
): Promise<void> {
  try {
    if (!assignedUserEmail) {
      console.warn('No assigned user email for follow-up reminder');
      return;
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://jschoice-website.vercel.app';
    const fullName = `${lead.first_name} ${lead.last_name || ''}`.trim();

    await resend.emails.send({
      from: 'JS Choice CRM <noreply@jschoicegroup.com.au>',
      to: assignedUserEmail,
      subject: `⏰ Reminder: Follow-up with ${fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: ${COLORS.background}; color: ${COLORS.text};">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: ${COLORS.white}; border-radius: 8px; overflow: hidden; margin-top: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
             <!-- Header -->
            <tr>
              <td style="padding: 20px 30px; background-color: ${COLORS.secondary};">
                 <h2 style="margin: 0; color: ${COLORS.text}; font-size: 20px;">⏰ Follow-up Reminder</h2>
              </td>
            </tr>
            
            <tr>
              <td style="padding: 30px;">
                <p style="font-size: 16px; margin-bottom: 20px;">Hi Team,</p>
                <p style="font-size: 16px; margin-bottom: 20px;">This is a reminder to follow up with <strong>${fullName}</strong>.</p>
                
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid ${COLORS.border}; border-radius: 6px; margin-bottom: 25px;">
                  <tr>
                    <td style="padding: 10px 15px; background-color: #F8FAFC; width: 30%; font-weight: bold; color: ${COLORS.textLight}; border-bottom: 1px solid ${COLORS.border};">Due Date</td>
                    <td style="padding: 10px 15px; border-bottom: 1px solid ${COLORS.border};">${new Date(dueDate).toLocaleDateString()}</td>
                  </tr>
                   <tr>
                    <td style="padding: 10px 15px; background-color: #F8FAFC; width: 30%; font-weight: bold; color: ${COLORS.textLight}; border-bottom: 1px solid ${COLORS.border};">Email</td>
                    <td style="padding: 10px 15px; border-bottom: 1px solid ${COLORS.border};"><a href="mailto:${lead.email}" style="color: ${COLORS.primary}; text-decoration: none;">${lead.email}</a></td>
                  </tr>
                  ${lead.phone ? `
                  <tr>
                    <td style="padding: 10px 15px; background-color: #F8FAFC; width: 30%; font-weight: bold; color: ${COLORS.textLight}; border-bottom: 1px solid ${COLORS.border};">Phone</td>
                    <td style="padding: 10px 15px; border-bottom: 1px solid ${COLORS.border};"><a href="tel:${lead.phone}" style="color: ${COLORS.primary}; text-decoration: none;">${lead.phone}</a></td>
                  </tr>` : ''}
                   <tr>
                    <td style="padding: 10px 15px; background-color: #F8FAFC; width: 30%; font-weight: bold; color: ${COLORS.textLight};">Note</td>
                    <td style="padding: 10px 15px;">${note || 'No specific note provided.'}</td>
                  </tr>
                </table>

                <div style="text-align: center;">
                  <a href="${appUrl}/admin/login" 
                     style="display: inline-block; background-color: ${COLORS.text}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                    View Lead in CRM →
                  </a>
                </div>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    console.log(`✅ Follow-up reminder sent for lead: ${lead.id}`);
  } catch (error) {
    console.error('❌ Failed to send follow-up reminder:', error);
  }
}

/**
 * Send a direct email to a lead
 */
export async function sendDirectEmail(
  to: string,
  subject: string,
  message: string,
  leadName: string
): Promise<{ success: boolean; error?: any }> {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'jschoice.au@gmail.com';

    // Try sending from verified domain
    const { data, error } = await resend.emails.send({
      from: 'JS Choice Group <info@jschoicegroup.com.au>',
      to: to,
      replyTo: adminEmail,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: ${COLORS.background}; color: ${COLORS.text};">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: ${COLORS.white}; border-radius: 8px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <!-- Header -->
            <tr>
              <td align="center" style="padding: 40px 0; background-color: ${COLORS.primary};">
                <h1 style="color: ${COLORS.text}; font-size: 28px; font-weight: 700; margin: 0;">JS Choice Group</h1>
              </td>
            </tr>
            
            <!-- Message Content -->
            <tr>
              <td style="padding: 40px 30px;">
                <p style="font-size: 18px; margin-bottom: 20px;">Hi ${leadName},</p>
                
                <div style="font-size: 16px; line-height: 1.6; color: ${COLORS.text}; margin-bottom: 30px; white-space: pre-wrap;">
${message}
                </div>

                <p style="font-size: 16px; color: ${COLORS.textLight};">
                  Best regards,<br>
                  <strong>JS Choice Group Team</strong>
                </p>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background-color: #F7FAFC; padding: 30px; text-align: center; border-top: 1px solid ${COLORS.border};">
                <p style="font-size: 12px; color: #A0AEC0;">
                  Suite 106, Level 1, C5, 2 Main Street, Point Cook VIC 3030<br>
                  <a href="mailto:info@jschoicegroup.com.au" style="color: ${COLORS.primary}; text-decoration: none;">info@jschoicegroup.com.au</a> | 1300 572 464
                </p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      if (error.name === 'validation_error' || (error as any).statusCode === 403) {
        console.log('ℹ️ Production domain not verified. Using Resend Sandbox fallback...');
      } else {
        console.error('❌ Resend API Error:', error);
      }

      // Fallback for sandbox if domain not verified
      const { error: sandboxError } = await resend.emails.send({
        from: 'JS Choice Group <onboarding@resend.dev>',
        to: to,
        subject: `[Dev Sandbox] ${subject}`,
        html: `
          <div style="background: #FFFBEB; padding: 10px; border: 1px solid #F6E05E; margin-bottom: 20px; font-size: 12px; color: #856404;">
            <strong>Sandbox Mode:</strong> This is a test email sent from JS Choice CRM development env.
          </div>
          <p>Hi ${leadName},</p>
          <div style="white-space: pre-wrap;">${message}</div>
        `,
      });

      if (sandboxError) {
        console.error('❌ Sandbox sending failed:', sandboxError);
        return { success: false, error: sandboxError };
      }

      console.log(`✅ Email queued via Resend Sandbox for: ${to}`);
      return { success: true };
    }

    console.log(`✅ Email sent via verified domain to: ${to}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send direct email:', error);
    return { success: false, error };
  }
}
