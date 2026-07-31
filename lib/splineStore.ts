type Listener = () => void;

class SplineStore {
  private listeners: Set<Listener> = new Set();
  
  public heroLoaded: boolean = false;
  public personasLoaded: boolean = false;

  setHeroLoaded(value: boolean) {
    this.heroLoaded = value;
    this.emit();
  }

  setPersonasLoaded(value: boolean) {
    this.personasLoaded = value;
    this.emit();
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit() {
    this.listeners.forEach((l) => l());
  }
}

export const splineStore = new SplineStore();
