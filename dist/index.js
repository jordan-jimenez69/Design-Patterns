"use strict";
// src/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
class LiasseVierge {
    static instance;
    documents = ["Certificat de cession", "Bon de commande"];
    constructor() { }
    static getInstance() {
        if (!LiasseVierge.instance) {
            LiasseVierge.instance = new LiasseVierge();
        }
        return LiasseVierge.instance;
    }
    clone() {
        const copie = new LiasseVierge();
        copie.documents = [...this.documents];
        return copie;
    }
}
// Test
const modele = LiasseVierge.getInstance();
const liasseClient1 = modele.clone();
console.log("Documents pour le client :", liasseClient1.documents);
//# sourceMappingURL=index.js.map