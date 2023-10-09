const names = ["Ivan", "Tin", "Petra", "Mia", "Marko"];

export default function randomName() {
  return names[Math.floor(Math.random() * names.length)];
}
