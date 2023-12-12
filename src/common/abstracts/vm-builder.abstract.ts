export abstract class AbstractVmBuilder<T> {
  protected vm: T;

  public build() {
    return this.vm;
  }
}
