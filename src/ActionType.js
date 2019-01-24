export default function ActionType(name, options = { shouldBeSent: false }) {
    this.name = name;
    this.options = options;
}