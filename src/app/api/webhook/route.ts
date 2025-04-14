import createUser from "@/lib/actions/user.action";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(request: Request) {
  // Lấy thông tin từ headers của request
  const svixId = headers().get("svix-id") ?? "";
  const svixTimestamp = headers().get("svix-timestamp") ?? "";
  const svixSignature = headers().get("svix-signature") ?? "";

  // Kiểm tra nếu không có WEBHOOK_SECRET
  if (!process.env.WEBHOOK_SECRET) {
    throw new Error("WEBHOOK_SECRET is not set");
  }

  // Kiểm tra nếu thiếu headers từ Svix
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Bad Request: Missing SVIX headers", { status: 400 });
  }

  // Đọc payload JSON từ request
  const payload = await request.json();
  const body = JSON.stringify(payload);

  const svix = new Webhook(process.env.WEBHOOK_SECRET);
  let message: WebhookEvent;

  try {
    // Xác minh webhook signature
    message = svix.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("SVIX verification failed:", error);
    return new Response("Unauthorized", { status: 401 });
  }

  // Xử lý sự kiện user.created
  if (message.type === "user.created") {
    const userData = message.data;

    // Lấy các thông tin cần thiết từ webhook payload
    const clerkId = userData.id;
    const rawEmail = userData.email_addresses?.[0]?.email_address || "";
    const safeEmail = rawEmail.trim().toLowerCase();

    const username = userData.username || safeEmail.split("@")[0];
    const firstName = userData.first_name;
    const lastName = userData.last_name;

    const safeName =
      (firstName && lastName && `${firstName} ${lastName}`) ||
      firstName ||
      lastName ||
      username;

    const avatar = userData.image_url || userData.profile_image_url || "";

    // In ra thông tin người dùng
    console.log("Thông tin user:", {
      clerkId,
      safeEmail,
      safeName,
      username,
      avatar,
    });

    // Kiểm tra các trường bắt buộc
    if (!clerkId || !safeEmail || !safeName || !username) {
      console.error("❌ Thiếu dữ liệu bắt buộc:", {
        clerkId,
        safeEmail,
        safeName,
        username,
      });
      return new Response("Missing required user fields", { status: 400 });
    }

    try {
      // In ra thông tin trước khi gọi hàm tạo user
      console.log("📦 Đang tạo user:", {
        clerkId,
        email: safeEmail,
        name: safeName,
        username,
        avatar,
      });

      // Gọi hàm tạo user
      const user = await createUser({
        username,
        name: safeName,
        email: safeEmail,
        clerkId,
        avatar,
      });

      // Nếu user được tạo thành công
      console.log("✅ User đã được tạo hoặc tái sử dụng:", user);
      return NextResponse.json({
        message: "User created or reused successfully",
        user,
      });
    } catch (error: any) {
      // Lỗi khi tạo user
      console.error("❌ Lỗi khi tạo user:", error.message || error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  // Trả về 200 cho các sự kiện không xử lý
  return new Response("OK", { status: 200 });
}
