import { sendWhatsApp } from "../utils/twilio";

export const whatAppService = {
    notifyOrder(phone:string, name:string, status:string){
        return sendWhatsApp(
            phone,
            `Hi ${name}, your order has been placed successfully!
            Status: ${status},
            Thank you for choosing Homely Meals`
        )
    }
}