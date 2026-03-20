interface InitParams {
    email: string;
    amount: number;
    reference: string;
    metadata?: Record<string, any>;
}
export declare function initializePaystack(data: InitParams): Promise<any>;
export declare function verifyPaystack(reference: string): Promise<any>;
export {};
//# sourceMappingURL=paystack.service.d.ts.map