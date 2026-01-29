interface NotificationStrategy {
  send(message: string, recipient: string): void;
}
class EmailNotification implements NotificationStrategy {
    send(message: string, recipient: string): void {
        console.log(`Email envoyé à ${recipient} : ${message}`);
    }
}
class SMSNotification implements NotificationStrategy {
    send(message: string, recipient: string): void {
        console.log(`SMS envoyé à ${recipient} : ${message}`);
    }
}
class DiscordNotification implements NotificationStrategy {
    send(message: string, recipient: string): void {
        console.log(`Message Discord envoyé à ${recipient} : ${message}`);
    }
}

class NotificationService {
  private strategy: NotificationStrategy;

  constructor(strategy: NotificationStrategy) {
    this.strategy = strategy;
  }

  sendNotification(message: string, recipient: string): void {
    this.strategy.send(message, recipient);
  }
}

const emailService = new NotificationService(new EmailNotification());
emailService.sendNotification(
  "commande prête",
  "client@example.com"
);

const smsService = new NotificationService(new SMSNotification());
smsService.sendNotification(
  "Code: 1234",
  "+33612345678"
);

const discordService = new NotificationService(new DiscordNotification());
discordService.sendNotification(
  "Nouveau message dans le canal",
  "User#1234"
);