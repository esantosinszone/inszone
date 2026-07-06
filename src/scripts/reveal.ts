export class RevealFade {
  private rafId: number | null = null
  private readonly delay: number = 200
  private lastTime: number = 0
  private readonly observer: IntersectionObserver
  
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target
            if (!element.classList.contains('reveal-fade__visible')) {
              element.classList.add('reveal-fade__pending')
              if (!this.rafId) {
                this.rafId = requestAnimationFrame(() => this.reveal())
              }
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '1px'
      }
    )
  }

  public observe(): void {
    document.querySelectorAll('.reveal-fade').forEach((element) => {
      this.observer.observe(element)
    })
  }
  
  private reveal(): void {
    this.rafId = null
    const now = performance.now()

    if (now - this.lastTime > this.delay) {
      this.lastTime = now
      const pendingElements = document.querySelectorAll('.reveal-fade__pending')
      if (pendingElements.length > 0) {
        pendingElements[0].classList.remove('reveal-fade__pending')
        pendingElements[0].classList.add('reveal-fade__visible')
      }
    }

    if (document.querySelectorAll('.reveal-fade__pending').length >= 1) {
      this.rafId = requestAnimationFrame(() => this.reveal())
    }
  }
}

export class RevealUp {
  private rafId: number | null = null;
  private readonly delay: number = 80;
  private lastTime: number = 0;
  private readonly observer: IntersectionObserver;
  
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            if (!element.classList.contains('reveal-up__visible')) {
              element.classList.add('reveal-up__pending');
              if (!this.rafId) {
                this.rafId = requestAnimationFrame(() => this.reveal());
              }
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '1px'
      }
    );
  }

  public observe(): void {
    document.querySelectorAll('.reveal-up').forEach((element) => {
      this.observer.observe(element);
    });
  }

  private reveal(): void {
    this.rafId = null;
    const now = performance.now();

    if (now - this.lastTime > this.delay) {
      this.lastTime = now;
      const pendingElements = document.querySelectorAll('.reveal-up__pending');
      if (pendingElements.length > 0) {
        pendingElements[0].classList.remove('reveal-up__pending');
        pendingElements[0].classList.add('reveal-up__visible');
      }
    }

    if (document.querySelectorAll('.reveal-up__pending').length >= 1) {
      this.rafId = requestAnimationFrame(() => this.reveal());
    }
  }
}

export class RevealLeft {
  private rafId: number | null = null;
  private readonly delay: number = 80;
  private lastTime: number = 0;
  private readonly observer: IntersectionObserver;
  
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            if (!element.classList.contains('reveal-left__visible')) {
              element.classList.add('reveal-left__pending');
              if (!this.rafId) {
                this.rafId = requestAnimationFrame(() => this.reveal());
              }
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '1px'
      }
    );
  }

  public observe(): void {
    document.querySelectorAll('.reveal-left').forEach((element) => {
      this.observer.observe(element);
    });
  }

  private reveal(): void {
    this.rafId = null;
    const now = performance.now();

    if (now - this.lastTime > this.delay) {
      this.lastTime = now;
      const pendingElements = document.querySelectorAll('.reveal-left__pending');
      if (pendingElements.length > 0) {
        pendingElements[0].classList.remove('reveal-left__pending');
        pendingElements[0].classList.add('reveal-left__visible');
      }
    }

    if (document.querySelectorAll('.reveal-left__pending').length >= 1) {
      this.rafId = requestAnimationFrame(() => this.reveal());
    }
  }
}