
interface DocumentPrototype {
    clone(): DocumentPrototype;
}

class LiasseVierge implements DocumentPrototype {
    private static instance: LiasseVierge;
    public documents: string[] = ["Certificat de cession", "Bon de commande"];

    private constructor() { }

    public static getInstance(): LiasseVierge {
        if (!LiasseVierge.instance) {
            LiasseVierge.instance = new LiasseVierge();
        }
        return LiasseVierge.instance;
    }

    public clone(): LiasseVierge {
        const copie = new (LiasseVierge as any)() as LiasseVierge;
        copie.documents = [...this.documents];
        return copie;
    }
}

const modele = LiasseVierge.getInstance();
const liasseClient1 = modele.clone();
console.log("Documents pour le client :", liasseClient1.documents);