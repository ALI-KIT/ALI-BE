class AbstractBase {
    constructor() {
        if (this.isAbstractClass())
            throw new Error(`Abstract class ${this.constructor.name} cannot be instantiated`);
    }

    isAbstractClass() {
        return false;
    }

    throwAbstract() {
        throw new Error(`${this.constructor.name} must implement abstract member`);
    }
}