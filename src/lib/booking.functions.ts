import { createServerFn } from "@tanstack/react-start";
import { google } from "googleapis";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const createBooking = createServerFn({ method: "POST" })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    // 1. Authenticate with Google
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });
    const calendar = google.calendar({ version: "v3", auth });

    // 2. Create Calendar Event
    const event = {
      summary: `Consultation: ${data.name}`,
      description: `Email: ${data.email}\nPhone: ${data.phone}\nService: ${data.service}\nNotes: ${data.notes}`,
      start: {
        dateTime: `${data.date}T${data.time}:00`,
        timeZone: "Africa/Johannesburg",
      },
      end: {
        dateTime: `${data.date}T${data.time}:00`, // Adjust duration if needed
        timeZone: "Africa/Johannesburg",
      },
    };

    // Note: You may want to add 30 or 60 mins to the end time
    const endDateTime = new Date(`${data.date}T${data.time}:00`);
    endDateTime.setMinutes(endDateTime.getMinutes() + 45); // 45 min meeting
    event.end.dateTime = endDateTime.toISOString();

    try {
      await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        requestBody: event,
      });
    } catch (calError) {
      console.error("Google Calendar Error:", calError);
      throw new Error("Could not create calendar event.");
    }

    // 3. Save to Supabase
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("bookings").insert({
      name: data.name,
      email: data.email,
      date: data.date,
      time: data.time,
      service: data.service,
    });

    // 4. Send Confirmation Email
    await resend.emails.send({
      from: "Trident Cloud <bookings@tridentcloud.co.za>",
      to: data.email,
      subject: "Booking Confirmed - Trident Cloud",
      html: `<p>Hi ${data.name},</p><p>Your consultation for ${data.date} at ${data.time} is confirmed.</p>`,
    });

    return { success: true };
  });