import { defineStore } from "pinia";
import type { LineItem, ShippingInfo } from "~/types";
import paymentGateway from '~/services/payment';
import { useShopStore } from '~/stores/shop';

export const useCheckoutStore = defineStore("checkout", {
  state: () => ({
    lineItems: [] as LineItem[],
    shippingInfo: {
      firstName: '',
      lastName: '',
      phone: '',
      country: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    paymentDetails: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      amount: 0
    },
    deliveryMethod: {
      type: 'Standard',
      price: 5.00
    },
    paymentSuccess: false,
    transactionId: '',
    error: '',
    paymentMethod: '',
    processingPayment: false,
  }),
  getters: {
    getShippingInfo(state) {
      return state.shippingInfo;
    },
    subtotal(state) {
      return state.lineItems.reduce((total, item) => total + item.subTotal, 0);
    },
    shippingTotal(state) {
      return state.deliveryMethod.price;
    },
    total(state) {
      return state.lineItems.reduce((total, item) => total + item.subTotal, 0) + state.deliveryMethod.price;
    },
    isShippingInfoComplete(state) {
      return Object.values(state.shippingInfo).every(value => value !== '');
    },
    isPaymentDetailsComplete(state) {
      return Object.values(state.paymentDetails).every(value => value !== '');
    },
    isDeliveryMethodComplete(state) {
      return state.deliveryMethod.type !== '' && state.deliveryMethod.price > 0;
    }
  },
  actions: {
    updateShippingInfo(info: ShippingInfo) {
      this.shippingInfo = { ...this.shippingInfo, ...info };
    },
    async fetchLineItems() {
      const shopStore = useShopStore();
      this.lineItems = shopStore.cart.map(item => ({
        quantity: item.quantity, subTotal: item.subTotal, ...item.product
      }));
    },
    async processPayment() {
      this.error = '';
      this.paymentSuccess = false;
      this.processingPayment = true;
      try {
        this.paymentDetails.amount = this.total;
        const [expiryMonth, expiryYear] = this.paymentDetails.expiryDate.split('/').map(Number);
        const paymentInfo = {
          ...this.paymentDetails,
          expiryMonth,
          expiryYear,
          deliveryMethod: this.deliveryMethod.type
        };

        const result = await paymentGateway.processPayment(paymentInfo);
        this.paymentSuccess = !!result;
        this.transactionId = result.transactionId;
        if (!!result) {
          const shopStore = useShopStore();
          shopStore.clearCart();
          this.clearCheckoutData();
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message || 'Payment failed' : 'Payment failed';
      } finally {
        this.processingPayment = false;
      }
    },
    clearCheckoutData() {
      this.lineItems = [];
      this.shippingInfo = {
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
      };
      this.paymentDetails = {
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        amount: 0
      };
      this.deliveryMethod = {
        type: 'Standard',
        price: 5.00
      };
      this.paymentMethod = '';
      this.processingPayment = false;
    },
    setDeliveryMethod(type: string, price: number) {
      this.deliveryMethod = { type, price };
    },
    updatePaymentDetails(details: Partial<typeof this.paymentDetails>) {
      this.paymentDetails = { ...this.paymentDetails, ...details };
    }
  }
});
