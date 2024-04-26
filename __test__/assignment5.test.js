
const { PaymentDetails, PayPalData, PayPal, PaymentProxy, RideDetails, HighDemand, NormalDemand, LowDemand,
  RidePrice, Coupon, CouponDistributionSystem, Rider, UserService, RideService, PaymentService, BaseService,
  ExtendedService, PremiumService, Model, View, Controller } = require('../src/assignment5');

//Question 4: Proxy Pattern Test Case
describe('PaymentProxy', () => {
  it('should process payment using PayPal', () => {
    const paymentDetails = new PaymentDetails(100, 'USD');
    const paymentProxy = new PaymentProxy();
    PayPal.prototype.processPayment = jest.fn();

    paymentProxy.makePayment(paymentDetails);
    expect(PayPal.prototype.processPayment).toHaveBeenCalledWith(expect.any(PayPalData));
    expect(PayPal.prototype.processPayment).toHaveBeenCalledTimes(1);
  });
});


//Question 5: Strategy Pattern Test Case
describe('RidePrice with different strategies', () => {
  it('should calculate high demand price correctly', () => {
    const rideDetails = new RideDetails(0.2, 10, 100);
    const ridePrice = new RidePrice(new HighDemand());
    expect(ridePrice.calculatePrice(rideDetails)).toBe(120);
  });

  it('should calculate normal demand price correctly', () => {
    const rideDetails = new RideDetails(0.1, 10, 100);
    const ridePrice = new RidePrice(new NormalDemand());
    expect(ridePrice.calculatePrice(rideDetails)).toBe(100);
  });

  it('should calculate low demand price correctly', () => {
    const rideDetails = new RideDetails(-0.1, 10, 100);
    const ridePrice = new RidePrice(new LowDemand());
    expect(ridePrice.calculatePrice(rideDetails)).toBe(90);
  });
});

//Question 6: Observer Pattern Test Case
describe('CouponDistributionSystem', () => {
  it('should notify all registered riders with a coupon', () => {
    const couponSystem = new CouponDistributionSystem();
    const rider1 = new Rider();
    const rider2 = new Rider();

    //rider update method
    Rider.prototype.update = jest.fn();

    couponSystem.registerObserver(rider1);
    couponSystem.registerObserver(rider2);
    couponSystem.sendCoupons();

    //expect that riders receive the coupon
    expect(Rider.prototype.update).toHaveBeenCalledWith(expect.any(Coupon));
    expect(Rider.prototype.update).toHaveBeenCalledTimes(2); //both riders should be notified
  });
});

// Question 10: Decorator Pattern Test Case
describe('Decorator Pattern Test Cases', () => {
  it('should provide basic service', () => {
    const baseService = new BaseService();
    expect(baseService.provideService()).toBe('Basic Service');
  });

  it('should provide extended service', () => {
    const baseService = new BaseService();
    const extendedService = new ExtendedService(baseService);
    expect(extendedService.provideService()).toBe('Basic Service with Extra Features');
  });

  it('should provide premium service', () => {
    const baseService = new BaseService();
    const premiumService = new PremiumService(baseService);
    expect(premiumService.provideService()).toBe('Basic Service with Premium Features');
  });
});

// Question 11: Microservices Pattern Test Case
describe('Microservices Test Cases', () => {
  it('should create a new user', () => {
    const userService = new UserService();
    const user = userService.createUser('Jane Doe', 'jane.doe@example.com');
    expect(user.name).toBe('Jane Doe');
    expect(user.email).toBe('jane.doe@example.com');
  });

  it('should create a new ride', () => {
    const userService = new UserService();
    const rideService = new RideService();
    const user = userService.createUser('Jane Doe', 'jane.doe@example.com');
    const ride = rideService.createRide(user.id, 'Airport');
    expect(ride.destination).toBe('Airport');
  });

  it('should process a payment', () => {
    const userService = new UserService();
    const rideService = new RideService();
    const paymentService = new PaymentService();

    const user = userService.createUser('Jane Doe', 'jane.doe@example.com');
    const ride = rideService.createRide(user.id, 'Airport');
    const payment = paymentService.processPayment(ride.rideId, 75);

    expect(payment.status).toBe('Paid');
    expect(payment.amount).toBe(75);
  });
});

// Question 12: MVC Pattern Test Case
describe('MVC Test Cases', () => {
  it('should initialize with initial data', () => {
    const model = new Model('Initial Data');
    expect(model.getData()).toBe('Initial Data');
  });

  it('should update data and render the view', () => {
    const model = new Model('Initial Data');
    const controller = new Controller(model);
    const view = new View(controller);

    // Mock console.log to capture output
    const consoleLogSpy = jest.spyOn(console, 'log');

    // Test rendering with updated data
    controller.setData('Updated Data');
    view.render();

    expect(consoleLogSpy).toHaveBeenCalledWith('Displaying data: Updated Data');

    consoleLogSpy.mockRestore();
  });
});


