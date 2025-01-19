import type { CCInfo } from "~/types";

class MockPaymentGateway {
  transactions: Map<string, any>;
  cards: Map<string, any>;

  constructor() {
    this.transactions = new Map();
    this.cards = new Map([
      ['4111111111111111', { valid: true, funds: 1000000 }],
      ['4242424242424242', { valid: true, funds: 5008 }],
      ['4000000000000002', { valid: false, funds: 0 }]
    ]);
  }

  /**
   * Process a payment transaction
   * @param {Object} paymentDetails
   * @returns {Promise<Object>} Transaction result
   */
  async processPayment({
    cardNumber,
    expiryMonth,
    expiryYear,
    cvv,
    amount,
    currency = 'USD'
  }: CCInfo) {
    // Simulate network latency
    await this.simulateLatency();

    // Basic validation
    const validationError = this.validatePaymentDetails({
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      amount
    });

    if (validationError) {
      throw new PaymentError(validationError);
    }

    // Check if card exists and has sufficient funds
    const card = this.cards.get(cardNumber);
    if (!card) {
      throw new PaymentError('Invalid card number');
    }

    if (!card.valid) {
      throw new PaymentError('Card has been declined');
    }

    if (card.funds < amount) {
      throw new PaymentError('Insufficient funds');
    }

    // Generate transaction ID and process payment
    const transactionId = this.generateTransactionId();
    const timestamp = new Date().toISOString();

    const transaction = {
      transactionId,
      amount,
      currency,
      status: 'success',
      timestamp,
      last4: cardNumber.slice(-4)
    };

    // Store transaction
    this.transactions.set(transactionId, transaction);

    // Update card balance
    card.funds -= amount;

    return transaction;
  }

  /**
   * Retrieve transaction details
   * @param {string} transactionId
   * @returns {Object|null} Transaction details
   */
  getTransaction(transactionId: string) {
    return this.transactions.get(transactionId) || null;
  }

  /**
   * Refund a transaction
   * @param {string} transactionId
   * @returns {Promise<Object>} Refund result
   */
  async refundTransaction(transactionId: string) {
    await this.simulateLatency();

    const transaction = this.transactions.get(transactionId);
    if (!transaction) {
      throw new PaymentError('Transaction not found');
    }

    if (transaction.status === 'refunded') {
      throw new PaymentError('Transaction already refunded');
    }

    // Process refund
    const refundId = this.generateTransactionId();
    const timestamp = new Date().toISOString();

    const refund = {
      refundId,
      originalTransactionId: transactionId,
      amount: transaction.amount,
      currency: transaction.currency, // Ensure currency is included in the refund
      status: 'success',
      timestamp
    };

    // Update original transaction
    transaction.status = 'refunded';
    transaction.refundId = refundId;

    return refund;
  }

  /**
   * Validate payment details
   * @param {Object} details Payment details
   * @returns {string|null} Error message or null if valid
   */
  validatePaymentDetails({ cardNumber, expiryMonth, expiryYear, cvv, amount }: CCInfo) {
    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
      return 'Invalid card number format';
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (!expiryMonth || !expiryYear ||
      expiryMonth < 1 || expiryMonth > 12 ||
      expiryYear < currentYear ||
      (expiryYear === currentYear && expiryMonth < currentMonth)) {
      return 'Invalid expiry date';
    }

    if (!cvv || !/^\d{3,4}$/.test(cvv)) {
      return 'Invalid CVV';
    }

    if (!amount || amount <= 0) {
      return 'Invalid amount';
    }

    return null;
  }

  /**
   * Generate a unique transaction ID
   * @returns {string} Transaction ID
   */
  generateTransactionId() {
    return 'tr_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Simulate network latency
   * @returns {Promise<void>}
   */
  async simulateLatency() {
    const delay = Math.random() * 1000 + 500; // Random delay between 500-1500ms
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}

class PaymentError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = 'PaymentError';
  }
}

export default new MockPaymentGateway();