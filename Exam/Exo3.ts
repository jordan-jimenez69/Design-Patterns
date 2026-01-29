abstract class Coffee {
  abstract getDescription(): string;
  abstract getCost(): number;
}

class SimpleCoffee extends Coffee {
    getDescription(): string {
        return "Simple Coffee";
    }

    getCost(): number {
        return 2;
    }
}

abstract class CoffeeDecorator extends Coffee {
    protected decoratedCoffee: Coffee;
    constructor(coffee: Coffee) {
        super();
        this.decoratedCoffee = coffee;
    }   
}

class MilkDecorator extends CoffeeDecorator {
    getDescription(): string {
        return this.decoratedCoffee.getDescription() + ", Milk";
    }
    getCost(): number {
        return this.decoratedCoffee.getCost() + 1;
    }
}   
class SugarDecorator extends CoffeeDecorator {
    getDescription(): string {
        return this.decoratedCoffee.getDescription() + ", Sugar";
    }
    getCost(): number {
        return this.decoratedCoffee.getCost() + 0.5;
    }
}
class CaramelDecorator extends CoffeeDecorator {
    getDescription(): string {
        return this.decoratedCoffee.getDescription() + ", Caramel";
    }
    getCost(): number {
        return this.decoratedCoffee.getCost() + 1.5;
    }   
}

function main() {
    let myCoffee: Coffee = new SimpleCoffee();
    console.log(`${myCoffee.getDescription()} : $${myCoffee.getCost()}`);
    myCoffee = new MilkDecorator(myCoffee);
    console.log(`${myCoffee.getDescription()} : $${myCoffee.getCost()}`);
    myCoffee = new SugarDecorator(myCoffee);
    console.log(`${myCoffee.getDescription()} : $${myCoffee.getCost()}`);
    myCoffee = new CaramelDecorator(myCoffee);
    console.log(`${myCoffee.getDescription()} : $${myCoffee.getCost()}`);
}

main();