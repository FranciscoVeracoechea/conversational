const Switch = (value = null, inputs = [], cases = {}, defaultCase = null) => ({
  value,
  cases,
  defaultCase,
  inputs,
  setValue(v) {
    return Switch(v, this.inputs, this.cases, this.defaultCase);
  },
  setInputs(...newInputs) {
    return Switch(this.value, newInputs, this.cases, this.defaultCase);
  },
  case(caseName, fn) {
    return Switch(this.value, this.inputs, { ...this.cases, [caseName]: fn }, this.defaultCase);
  },
  result() {
    return Object.prototype.hasOwnProperty.call(this.cases, this.value)
      ? this.cases[this.value](...this.inputs)
      : this.default(...this.inputs);
  },
  default(defaultFn) {
    return Switch(this.value, this.inputs, this.cases, defaultFn);
  },
});


export default Switch;
