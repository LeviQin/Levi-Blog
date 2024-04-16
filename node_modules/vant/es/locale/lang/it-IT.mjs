var stdin_default = {
  name: "Nome",
  tel: "Telefono",
  save: "Salva",
  confirm: "Conferma",
  cancel: "Annulla",
  delete: "Elimina",
  loading: "Caricamento in corso...",
  noCoupon: "Nessun coupon",
  nameEmpty: "Inserisci il nome",
  addContact: "Aggiungi contatto",
  telInvalid: "Numero di telefono errato",
  vanCalendar: {
    end: "Fine",
    start: "Inizio",
    title: "Calendario",
    weekdays: [
      "domenica",
      "Lunedi",
      "Marted\xEC",
      "mercoled\xEC",
      "gioved\xEC",
      "venerd\xEC",
      "Sabato"
    ],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `Scegli non pi\xF9 di ${maxRange} giorni`
  },
  vanCascader: {
    select: "Seleziona"
  },
  vanPagination: {
    prev: "Precedente",
    next: "Avanti"
  },
  vanPullRefresh: {
    pulling: "Tiri per aggiornare...",
    loosing: "Largo per rinfrescare..."
  },
  vanSubmitBar: {
    label: "Totale:"
  },
  vanCoupon: {
    unlimited: "Illimitato",
    discount: (discount) => `${discount * 10}% di sconto`,
    condition: (condition) => `Almeno ${condition}`
  },
  vanCouponCell: {
    title: "Buono",
    count: (count) => `Hai ${count} coupon`
  },
  vanCouponList: {
    exchange: "Scambio",
    close: "Chiudi",
    enable: "Disponibile",
    disabled: "Non disponibile",
    placeholder: "Codice coupon"
  },
  vanAddressEdit: {
    area: "Area",
    postal: "Postale",
    areaEmpty: "Seleziona un'area di ricezione",
    addressEmpty: "L'indirizzo non pu\xF2 essere vuoto",
    postalEmpty: "Codice postale errato",
    addressDetail: "Indirizzo",
    defaultAddress: "Imposta come indirizzo predefinito"
  },
  vanAddressList: {
    add: "Aggiungi nuovo indirizzo"
  }
};
export {
  stdin_default as default
};
