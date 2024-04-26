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
  calculatePrice(details) { }
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
  update(coupon) { }
}

class Subject {
  registerObserver(observer) { }
  removeObserver(observer) { }
  notifyObservers() { }
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


// Question 10: Sample Code for Decorator Pattern
class BaseService {
  provideService() {
    return 'Basic Service';
  }
}
class CityDecorator {
  constructor(service) {
    this.service = service;
  }

  provideService() {
    return this.service.provideService();
  }
}

class ExtendedService extends CityDecorator {
  provideService() {
    return this.service.provideService() + ' with Extra Features';
  }
}

class PremiumService extends CityDecorator {
  provideService() {
    return this.service.provideService() + ' with Premium Features';
  }
}

const baseService = new BaseService();
const extendedService = new ExtendedService(baseService);
const premiumService = new PremiumService(baseService);

console.log(extendedService.provideService()); // Outputs: "Basic Service with Extra Features"
console.log(premiumService.provideService()); // Outputs: "Basic Service with Premium Features"

// Question 11: Sample Code for Microservices Pattern
class UserService {
  createUser(name, email) {
    return { id: Math.random(), name, email };
  }
}

class RideService {
  createRide(userId, destination) {
    return { rideId: Math.random(), userId, destination };
  }
}

class PaymentService {
  processPayment(rideId, amount) {
    return { paymentId: Math.random(), rideId, amount, status: 'Paid' };
  }
}

// Client Code
const userService = new UserService();
const rideService = new RideService();
const paymentService = new PaymentService();

const user = userService.createUser('John Doe', 'john.doe@example.com');
const ride = rideService.createRide(user.id, 'Downtown');
const payment = paymentService.processPayment(ride.rideId, 50);

console.log(user); // Outputs user information
console.log(ride); // Outputs ride information
console.log(payment); // Outputs payment information

// Question 12: Sample Code for MVC Pattern
class Model {
  constructor(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }
}

class Controller {
  constructor(model) {
    this.model = model;
  }

  getData() {
    return this.model.getData();
  }

  setData(data) {
    this.model.setData(data);
  }
}

class View {
  constructor(controller) {
    this.controller = controller;
  }

  render() {
    const data = this.controller.getData();
    console.log(`Displaying data: ${data}`);
  }
}

// Initialization of the Controller and View
const model = new Model('Initial Data');
const controller = new Controller(model);
const view = new View(controller);

view.render(); // Outputs: "Displaying data: Initial Data"
controller.setData('Updated Data'); // Outputs: "Displaying data: Updated Data"

module.exports = {
  PaymentDetails, PayPalData, PayPal, PaymentProxy, RideDetails, HighDemand, NormalDemand, LowDemand, PricingStrategy, RidePrice,
  Observer, Subject, Coupon, CouponDistributionSystem, Rider, BaseService, CityDecorator, ExtendedService, PremiumService, UserService,
  RideService, PaymentService, Model, View, Controller
};
