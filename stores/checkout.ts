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
      aptNo: '',
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
    }
  },
  actions: {
    updateShippingInfo(info: ShippingInfo) {
      console.log('Updating shipping info', info);
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
      try {
        this.paymentDetails.amount = this.lineItems.reduce((total, item) => total + item.subTotal, 0) + this.deliveryMethod.price;
        const paymentInfo = {
          ...this.paymentDetails,
          expiryMonth: parseInt(this.paymentDetails.expiryDate.split('/')[0]),
          expiryYear: parseInt(this.paymentDetails.expiryDate.split('/')[1]),
          deliveryMethod: this.deliveryMethod.type
        };

        const result = await paymentGateway.processPayment(paymentInfo);
        this.paymentSuccess = true;
        this.transactionId = result.transactionId;
        this.paymentMethod = this.paymentDetails.cardName;
      } catch (err) {
        if (err instanceof Error) {
          this.error = err.message || 'Payment failed';
        } else {
          this.error = 'Payment failed';
        }
      }
    },
    setDeliveryMethod(type: string, price: number) {
      console.log('Delivery method set to', this.deliveryMethod);
      this.deliveryMethod = { type, price };
    }
  }
});
