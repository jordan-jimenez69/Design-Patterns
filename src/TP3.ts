// BRIDGE PATTERN - Notifications e-commerce

// Implémentation (Plateformes)
abstract class Platform {
  abstract send(type: string, message: string): void;
}

class EmailPlatform extends Platform {
  send(type: string, message: string): void {
    console.log(`Email [${type}]: ${message}`);
  }
}

class SMSPlatform extends Platform {
  send(type: string, message: string): void {
    console.log(`SMS [${type}]: ${message}`);
  }
}

class PushPlatform extends Platform {
  send(type: string, message: string): void {
    console.log(`Push [${type}]: ${message}`);
  }
}

class DiscordPlatform extends Platform {
  send(type: string, message: string): void {
    console.log(`Discord [${type}]: ${message}`);
  }
}

// Abstraction (Types de notification)
abstract class Notification {
  protected platform: Platform;

  constructor(platform: Platform) {
    this.platform = platform;
  }

  setPlatform(platform: Platform): void {
    this.platform = platform;
  }

  abstract send(message: string): void;
}

class CommandNotification extends Notification {
  send(message: string): void {
    this.platform.send("COMMANDE", message);
  }
}

class DeliveryNotification extends Notification {
  send(message: string): void {
    this.platform.send("LIVRAISON", message);
  }
}

class SupportNotification extends Notification {
  send(message: string): void {
    this.platform.send("SUPPORT", message);
  }
}

class PromotionNotification extends Notification {
  send(message: string): void {
    this.platform.send("PROMOTION", message);
  }
}

// DÉMO
const email = new EmailPlatform();
const sms = new SMSPlatform();
const push = new PushPlatform();
const discord = new DiscordPlatform();

const cmd = new CommandNotification(email);
cmd.send("Commande confirmée");

const liv = new DeliveryNotification(sms);
liv.send("Colis en route");

const sup = new SupportNotification(push);
sup.send("Agent va vous contacter");

const promo = new PromotionNotification(discord);
promo.send("50% de réduction!");

// Changement dynamique
cmd.setPlatform(discord);
cmd.send("Alerte commande");

cmd.setPlatform(sms);
cmd.send("Rappel commande");
