
// Abstract Product
abstract class Commande {
    constructor(protected montant: number) { }

    abstract valide(): boolean;
    abstract paye(): void;
}

// Concrete Product
class CommandeComptant extends Commande {
    constructor(montant: number) {
        super(montant);
    }

    valide(): boolean {
        console.log(`Validation de la commande au comptant d'un montant de ${this.montant}.`);
        return true;
    }

    paye(): void {
        console.log(`Paiement de la commande au comptant d'un montant de ${this.montant}.`);
    }
}

// Concrete Product
class CommandeCredit extends Commande {
    constructor(montant: number) {
        super(montant);
    }

    valide(): boolean {
        console.log(`Validation de la commande à crédit d'un montant de ${this.montant}.`);
        return true;
    }

    paye(): void {
        console.log(`Paiement de la commande à crédit d'un montant de ${this.montant}.`);
    }
}

// Abstract Creator
abstract class Client {
    protected commandes: Commande[] = [];

    // Factory Method
    protected abstract creeCommande(montant: number): Commande;

    public nouvelleCommande(montant: number): void {
        const commande = this.creeCommande(montant);
        if (commande.valide()) {
            commande.paye();
            this.commandes.push(commande);
        }
    }
}

// Concrete Creator
class ClientComptant extends Client {
    protected creeCommande(montant: number): Commande {
        return new CommandeComptant(montant);
    }
}

// Concrete Creator
class ClientCredit extends Client {
    protected creeCommande(montant: number): Commande {
        return new CommandeCredit(montant);
    }
}

// Exemple d'utilisation
console.log("--- Client Comptant ---");
const clientComptant = new ClientComptant();
clientComptant.nouvelleCommande(2000);

console.log("\n--- Client Crédit ---");
const clientCredit = new ClientCredit();
clientCredit.nouvelleCommande(5000);
