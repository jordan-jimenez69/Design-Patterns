// 1. Abstract Products
interface RIB {
    afficherDetails(): void;
}

interface Attestation {
    afficherArrete(): void;
}

// 2. Concrete Products (Particulier)
class RIBParticulier implements RIB {
    afficherDetails(): void {
        console.log("RIB Simplifié (Particulier) - Logo Banque");
    }
}

class AttestationParticulier implements Attestation {
    afficherArrete(): void {
        console.log("Attestation Standard (Particulier) - Logo Banque");
    }
}

// 2. Concrete Products (Professionnel)
class RIBProfessionnel implements RIB {
    afficherDetails(): void {
        console.log("RIB Détaillé avec SIRET (Professionnel) - Logo Banque");
    }
}

class AttestationProfessionnel implements Attestation {
    afficherArrete(): void {
        console.log("Attestation avec Mentions Légales (Professionnel) - Logo Banque");
    }
}

// 3. Abstract Factory
interface DocumentBancaireFactory {
    creerRIB(): RIB;
    creerAttestation(): Attestation;
}

// 4. Concrete Factories
class ParticulierFactory implements DocumentBancaireFactory {
    creerRIB(): RIB {
        return new RIBParticulier();
    }

    creerAttestation(): Attestation {
        return new AttestationParticulier();
    }
}

class ProfessionnelFactory implements DocumentBancaireFactory {
    creerRIB(): RIB {
        return new RIBProfessionnel();
    }

    creerAttestation(): Attestation {
        return new AttestationProfessionnel();
    }
}

// 5. Client Code
function imprimerDocumentsBancaires(factory: DocumentBancaireFactory) {
    const rib = factory.creerRIB();
    const attestation = factory.creerAttestation();

    console.log("--- Impression des documents ---");
    rib.afficherDetails();
    attestation.afficherArrete();
}

// Exemple d'utilisation
console.log("Client: Je suis un Particulier.");
imprimerDocumentsBancaires(new ParticulierFactory());

console.log("\nClient: Je suis un Professionnel.");
imprimerDocumentsBancaires(new ProfessionnelFactory());
