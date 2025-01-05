export interface PaymentInstrument {
    type: string;
}

export interface PhonePeBaseResponse {
    success: boolean;
    code: string;
    message: string;
}

export interface PaymentInitiateResponse extends PhonePeBaseResponse {
    data?: {
        merchantId: string;
        merchantTransactionId: string;
        instrumentResponse: {
            redirectInfo: {
                url: string;
            };
        };
    };
    error?: string;
}

export interface PaymentStatusResponse extends PhonePeBaseResponse {
    data?: {
        merchantId: string;
        merchantTransactionId: string;
        transactionId: string;
        amount: number;
        state: string;
        responseCode: string;
        paymentInstrument: PaymentInstrument;
    };
    error?: string;
}