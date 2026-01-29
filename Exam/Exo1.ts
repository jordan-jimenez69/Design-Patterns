class Configuration {
  private static instance: Configuration;

  public dbUrl: string;
  public language: string;
  public timezone: string;

  // constructeur privé
  private constructor() {
    this.language = "fr";
    this.timezone = "Europe/Paris";
    this.dbUrl = "";
  }

  public static getInstance(): Configuration {
    if (!Configuration.instance) {
      Configuration.instance = new Configuration();
    }
    return Configuration.instance;
  }
}
const config = Configuration.getInstance();
config.dbUrl = "mongodb://localhost";
