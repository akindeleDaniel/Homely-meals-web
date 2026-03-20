import https from "https";

interface InitParams {
  email: string;
  amount: number;
  reference: string;
  metadata?: Record<string, any>;
}

export function initializePaystack(data: InitParams): Promise<any> {
  return new Promise((resolve, reject) => {

    const payload = JSON.stringify({
      email: data.email,
      amount: data.amount,
      reference: data.reference,
      metadata: data.metadata,
    });

    const options = {
      hostname: "api.paystack.co",
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
        "Content-Length": payload.length,
      },
    };

    const req = https.request(options, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        try {
          const parsed = JSON.parse(body);
          resolve(parsed);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

export function verifyPaystack(reference: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.paystack.co",
      path: `/transaction/verify/${encodeURIComponent(reference)}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    };

    const req = https.request(options, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        try {
          const parsed = JSON.parse(body);
          resolve(parsed);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", (error) => reject(error));
    req.end();
  });
}

