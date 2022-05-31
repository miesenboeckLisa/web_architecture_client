
export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const OfferFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Dein Angebot benötigt einen Titel'),
  new ErrorMessage('description', 'required', 'Bitte füge eine Beschreibung hinzu'),
  new ErrorMessage('category', 'minlength', 'Eine Kategorie gehört eingegeben'),
  new ErrorMessage('appointments', 'required', 'Du musst deinen Angebot freie Termine hinzufügen'),
  new ErrorMessage('price', 'required', 'Wie viel kostet eine Stunde bei dir?'),
];
