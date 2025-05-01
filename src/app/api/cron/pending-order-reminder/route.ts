import { startOrderReminderCron } from "@/lib/orderReminderCron";


startOrderReminderCron();

export async function GET() {
  return Response.json({ success: true, message: 'Order reminder cron started' });
}
