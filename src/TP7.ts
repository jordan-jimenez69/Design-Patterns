interface ShippingStrategy {
  calculate(weight: number, distance: number, orderValue: number): number;
  getName(): string;
}

class StandardPost implements ShippingStrategy {
  calculate(weight: number): number {
    return 5 + weight * 0.5;
  }
  getName(): string { return "Standard Post"; }
}

class ExpressDelivery implements ShippingStrategy {
  calculate(weight: number, distance: number): number {
    return 10 + weight * 1 + (distance / 100) * 2;
  }
  getName(): string { return "Express Delivery"; }
}

class EcoShipping implements ShippingStrategy {
  calculate(weight: number): number {
    if (weight > 5) throw new Error("Eco Shipping: Poids maximal 5kg");
    return 3 + weight * 0.3;
  }
  getName(): string { return "Eco Shipping"; }
}

class PremiumCourier implements ShippingStrategy {
  calculate(weight: number, distance: number, orderValue: number): number {
    return orderValue >= 100 ? 0 : 20;
  }
  getName(): string { return "Premium Courier"; }
}

class ShippingCalculator {
  private strategy: ShippingStrategy;

  constructor(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: ShippingStrategy): void {
    this.strategy = strategy;
  }

  calculate(weight: number, distance: number, orderValue: number): number {
    return this.strategy.calculate(weight, distance, orderValue);
  }

  getShippingDetails(weight: number, distance: number, orderValue: number): string {
    const cost = this.calculate(weight, distance, orderValue);
    return `${this.strategy.getName()}: ${cost.toFixed(2)}€`;
  }
}

class AutoShippingSelector {
  private strategies: ShippingStrategy[] = [
    new StandardPost(),
    new ExpressDelivery(),
    new EcoShipping(),
    new PremiumCourier()
  ];

  findCheapest(weight: number, distance: number, orderValue: number): { strategy: ShippingStrategy; cost: number } {
    let cheapest: { strategy: ShippingStrategy | undefined; cost: number } = { strategy: undefined, cost: Infinity };
    for (const strategy of this.strategies) {
      try {
        const cost = strategy.calculate(weight, distance, orderValue);
        if (cost < cheapest.cost) {
          cheapest = { strategy, cost };
        }
      } catch (e) {
        let msg = '';
        if (e instanceof Error) {
          msg = e.message;
        } else {
          msg = String(e);
        }
        console.warn(`Stratégie ${strategy.getName()} non applicable: ${msg}`);
      }
    }
    if (!cheapest.strategy) {
      throw new Error('Aucune stratégie de livraison applicable');
    }
    return { strategy: cheapest.strategy, cost: cheapest.cost };
  }
}

function main() {
  const calc1 = new ShippingCalculator(new StandardPost());
  console.log(calc1.getShippingDetails(2, 50, 30));
  calc1.setStrategy(new ExpressDelivery());
  console.log(calc1.getShippingDetails(2, 50, 30));

  const selector = new AutoShippingSelector();
  const packages = [
    { weight: 2, distance: 50, value: 30 },
    { weight: 8, distance: 500, value: 150 },
  ];
  for (const pkg of packages) {
    const { strategy, cost } = selector.findCheapest(pkg.weight, pkg.distance, pkg.value);
    console.log(`Poids: ${pkg.weight}kg | Valeur: ${pkg.value}€ → ${strategy.getName()} (${cost.toFixed(2)}€)`);
  }
}

main();