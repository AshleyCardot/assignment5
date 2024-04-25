  
const {PaymentDetails, PayPalData, PayPal, PaymentProxy, RideDetails, HighDemand, NormalDemand, LowDemand, PricingStrategy, RidePrice, Observer, Subject, Coupon, CouponDistributionSystem, Rider} =require('/Users/ashleycardot/Documents/Software Engineering/assignment5/src/assignment5.js');
  
// Proxy Pattern Test Case
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
  

  // Strategy Pattern Test Case
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

  // Observer Pattern Test Case

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
  



  