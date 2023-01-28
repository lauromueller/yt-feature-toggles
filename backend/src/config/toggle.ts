class ToggleService {
  private isEnabled = false;
  static instance: ToggleService | null = null;

  private constructor() {}

  static getInstance = () => {
    if (!this.instance) {
      this.instance = new ToggleService();
    }

    return this.instance;
  };

  systemUnderLoad = () => {
    return this.isEnabled;
  };

  enable = () => {
    this.isEnabled = true;
  };

  disable = () => {
    this.isEnabled = false;
  };
}

export const toggleService = ToggleService.getInstance();
