//  Question 4: Sample Code for Proxy Pattern
class PaymentDetails {
    constructor(amount, currency) {
      this.amount = amount;
      this.currency = currency;
    }
  }
  
  class PayPalData {
    constructor(formattedData) {
      this.formattedData = formattedData;
    }
  }
  
  class PayPal {
    processPayment(data) {
      console.log(`Processing payment through PayPal`);
    }
  }
  
  class PaymentProxy {
    makePayment(details) {
      const formattedData = `${details.amount} ${details.currency}`;
      const paypalData = new PayPalData(formattedData);
      const paypal = new PayPal();
      paypal.processPayment(paypalData);
    }
  }
   
   
// Question 5: Sample Code for Strategy Pattern
  class PricingStrategy {
    calculatePrice(details) {}
  }
  
  class RideDetails {
    constructor(demandLevel, driverAvailability, basePrice) {
      this.demandLevel = demandLevel;
      this.driverAvailability = driverAvailability;
      this.basePrice = basePrice;
    }
  }
  
  class HighDemand extends PricingStrategy {
    calculatePrice(details) {
        return details.basePrice * (1 + details.demandLevel);
    }
  }
  
  class NormalDemand extends PricingStrategy {
    calculatePrice(details) {
      return details.basePrice;
    }
  }
  
  class LowDemand extends PricingStrategy {
    calculatePrice(details) {
        return details.basePrice * (1 - Math.abs(details.demandLevel));
    }
  }
  
  class RidePrice {
    constructor(strategy) {
      this.strategy = strategy;
    }
  
    calculatePrice(details) {
      return this.strategy.calculatePrice(details);
    }
  }
  

// Question 6: Sample Code for Observer Pattern
  class Observer {
    update(coupon) {}
  }
  
  class Subject {
    registerObserver(observer) {}
    removeObserver(observer) {}
    notifyObservers() {}
  }
  
  class Coupon {
    constructor(discount, description) {
      this.discount = discount;
      this.description = description;
    }
  }
  
  class CouponDistributionSystem extends Subject {
    constructor() {
      super();
      this.observers = [];
    }
  
    registerObserver(observer) {
      this.observers.push(observer);
    }
  
    removeObserver(observer) {
      const index = this.observers.indexOf(observer);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    }
  
    notifyObservers() {
      for (const observer of this.observers) {
        const coupon = new Coupon(10, "10% off your next ride!");
        observer.update(coupon);
      }
    }
  
    sendCoupons() {
      this.notifyObservers();
    }
  }
  
  class Rider extends Observer {
    update(coupon) {
      console.log(`Received a new coupon: ${coupon.description}`);
    }
  }

  module.exports = { PaymentDetails, PayPalData, PayPal, PaymentProxy, RideDetails, HighDemand, NormalDemand, LowDemand, PricingStrategy, RidePrice, Observer, Subject, Coupon, CouponDistributionSystem, Rider};
