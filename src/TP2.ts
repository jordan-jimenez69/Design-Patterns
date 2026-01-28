interface IContratPrototype {
    clone(): IContratPrototype
    afficher(): void
}

class ContratHabitation implements IContratPrototype {
    private clauses: string[] = []

    constructor(clausesExistantes?: string[]) {
        if (clausesExistantes) {
            this.clauses = clausesExistantes
        } else {
            this.clauses = []
        }
    }

    clone(): IContratPrototype {
        return new ContratHabitation([...this.clauses])
    }
    afficher(): void {
        console.log("Contrat Habitation avec les clauses suivantes:", this.clauses)
    }
}

class ContratAuto implements IContratPrototype {
    private clauses: string[] = []

    constructor(clausesExistantes?: string[]) {
        if (clausesExistantes) {
            this.clauses = clausesExistantes
        } else {
            this.clauses = []
        }
    }
    clone(): IContratPrototype {
        return new ContratAuto([...this.clauses])
    }
    afficher(): void {
        console.log("Contrat Auto avec les clauses suivantes:", this.clauses)
    }
}

class ContratVie implements IContratPrototype {
    private clauses: string[] = []

    constructor(clausesExistantes?: string[]) {
        if (clausesExistantes) {
            this.clauses = clausesExistantes
        } else {
            this.clauses = []
        }
    }
    clone(): IContratPrototype {
        return new ContratVie([...this.clauses])
    }
    afficher(): void {
        console.log("Contrat Vie avec les clauses suivantes:", this.clauses)
    }
}

class ContratFactory {
    private prototypes: Map<string, IContratPrototype> = new Map()

    constructor() {
        const habitationOriginal = new ContratHabitation(["Assurance Incendie v2026", "Garantie Inondation"]);
        const autoOriginal = new ContratAuto(["Bris de glace", "Assistance 0km"]);
        const vieOriginal = new ContratVie(["Garantie décès", "Garantie invalidité"]);

        this.prototypes.set("Habitation", habitationOriginal);
        this.prototypes.set("Auto", autoOriginal);
        this.prototypes.set("Vie", vieOriginal)
    }

    creerContrat(type: string): IContratPrototype {
        const prototype = this.prototypes.get(type)
        if (!prototype) {
            throw new Error("Contrat non supporté")
        }
        return prototype.clone()
    }
}

// Exemple d'utilisation
console.log("Client: Je suis un Particulier.");
const contratHabitation = new ContratFactory().creerContrat("Habitation");
contratHabitation.afficher();

console.log("\nClient: Je suis un Particulier.");
const contratAuto = new ContratFactory().creerContrat("Auto");
contratAuto.afficher();

console.log("\nClient: Je suis un Particulier.");
const contratVie = new ContratFactory().creerContrat("Vie");
contratVie.afficher();
