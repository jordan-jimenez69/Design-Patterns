// ============= INTERFACE EXISTANTE =============
interface IPaymentService {
  processPayment(amount: number, currency: string): string;
  refundPayment(transactionId: string, amount: number): boolean;
  getTransactionStatus(transactionId: string): string;
}

// ============= SERVICE EXTERNE (INCOMPATIBLE) =============
class PaymentPro {
  executerTransaction(montant: number, codeDevise: number): string {
    console.log(`PaymentPro: Exécution de ${montant} (code devise: ${codeDevise})`);
    return `TXN-${Date.now()}`;
  }

  annulerTransaction(reference: string): boolean {
    console.log(`PaymentPro: Annulation de ${reference}`);
    return true;
  }

  obtenirEtat(reference: string): number {
    // 0=En cours, 1=Validé, 2=Échoué
    return Math.floor(Math.random() * 3);
  }
}

// ============= ADAPTATEUR (PATTERN ADAPTER) =============
class PaymentProAdapter implements IPaymentService {
  private paymentPro: PaymentPro;
  private currencyMap: { [key: string]: number } = {
    EUR: 1,
    USD: 2,
    GBP: 3
  };

  private statusMap: { [key: number]: string } = {
    0: "Pending",
    1: "Completed",
    2: "Failed"
  };

  constructor(paymentPro: PaymentPro) {
    this.paymentPro = paymentPro;
  }

  processPayment(amount: number, currency: string): string {
    const currencyCode = this.currencyMap[currency];
    if (!currencyCode) throw new Error(`Devise non supportée: ${currency}`);
    return this.paymentPro.executerTransaction(amount, currencyCode);
  }

  refundPayment(transactionId: string, amount: number): boolean {
    return this.paymentPro.annulerTransaction(transactionId);
  }

  getTransactionStatus(transactionId: string): string {
    const numericStatus = this.paymentPro.obtenirEtat(transactionId);
    return this.statusMap[numericStatus] || "Unknown";
  }
}

// ============= AUTRE ADAPTATEUR (EXEMPLE: QuickPay) =============
class QuickPay {
  charge(amount: number, currencyCode: string): string {
    console.log(`QuickPay: Charge de ${amount} ${currencyCode}`);
    return `QP-${Date.now()}`;
  }

  refund(chargeId: string): boolean {
    console.log(`QuickPay: Remboursement ${chargeId}`);
    return true;
  }

  checkStatus(chargeId: string): string {
    return ["PENDING", "SUCCESS", "FAILED"][Math.floor(Math.random() * 3)] as string;
  }
}

class QuickPayAdapter implements IPaymentService {
  private quickPay: QuickPay;

  constructor(quickPay: QuickPay) {
    this.quickPay = quickPay;
  }

  processPayment(amount: number, currency: string): string {
    return this.quickPay.charge(amount, currency);
  }

  refundPayment(transactionId: string, amount: number): boolean {
    return this.quickPay.refund(transactionId);
  }

  getTransactionStatus(transactionId: string): string {
    const status = this.quickPay.checkStatus(transactionId);
    return status === "SUCCESS" ? "Completed" : status === "PENDING" ? "Pending" : "Failed";
  }
}

// ============= UTILISATION =============
function main() {
  console.log("=== ADAPTATION PaymentPro ===\n");
  
  // Utilisation du PaymentPro adapté
  const paymentProService: IPaymentService = new PaymentProAdapter(new PaymentPro());
  
  const txnId1 = paymentProService.processPayment(100, "EUR");
  console.log(`Transaction créée: ${txnId1}`);
  console.log(`Statut: ${paymentProService.getTransactionStatus(txnId1)}`);
  console.log(`Remboursé: ${paymentProService.refundPayment(txnId1, 100)}\n`);

  console.log("=== ADAPTATION QuickPay ===\n");
  
  // Intégration facile d'un autre service (QuickPay)
  const quickPayService: IPaymentService = new QuickPayAdapter(new QuickPay());
  
  const txnId2 = quickPayService.processPayment(50, "USD");
  console.log(`Transaction créée: ${txnId2}`);
  console.log(`Statut: ${quickPayService.getTransactionStatus(txnId2)}`);
  console.log(`Remboursé: ${quickPayService.refundPayment(txnId2, 50)}\n`);

  // Le code client n'a pas besoin de changement
  processOrder(paymentProService, 100, "EUR");
  processOrder(quickPayService, 75, "GBP");
}

// Code client existant - aucune modification nécessaire
function processOrder(paymentService: IPaymentService, amount: number, currency: string) {
  console.log(`--- Traitement commande ---`);
  const txnId = paymentService.processPayment(amount, currency);
  console.log(`Commande payée: ${txnId}`);
  console.log(`État: ${paymentService.getTransactionStatus(txnId)}\n`);
}

main();
