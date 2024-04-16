var stdin_default = {
  name: "Nombre",
  tel: "Tel\xE9fono",
  save: "Guardar",
  confirm: "Confirmar",
  cancel: "Cancelar",
  delete: "Eliminar",
  loading: "Cargando...",
  noCoupon: "Sin cupones",
  nameEmpty: "Por favor rellena el nombre",
  addContact: "A\xF1adi contacto",
  telInvalid: "Tel\xE9fono inv\xE1lido",
  vanCalendar: {
    end: "Fin",
    start: "Inicio",
    title: "Calendario",
    weekdays: ["Dom", "Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `Elija no m\xE1s de ${maxRange} d\xEDas`
  },
  vanCascader: {
    select: "Seleccione"
  },
  vanPagination: {
    prev: "Anterior",
    next: "Siguiente"
  },
  vanPullRefresh: {
    pulling: "Tira para recargar...",
    loosing: "Suelta para recargar..."
  },
  vanSubmitBar: {
    label: "Total:"
  },
  vanCoupon: {
    unlimited: "Ilimitado",
    discount: (discount) => `${discount * 10}% de descuento`,
    condition: (condition) => `Al menos ${condition}`
  },
  vanCouponCell: {
    title: "Cup\xF3n",
    count: (count) => `You have ${count} coupons`
  },
  vanCouponList: {
    exchange: "Intercambio",
    close: "Cerrar",
    enable: "Disponible",
    disabled: "No disponible",
    placeholder: "C\xF3digo del cup\xF3n"
  },
  vanAddressEdit: {
    area: "\xC1rea",
    postal: "C\xF3digo Postal",
    areaEmpty: "Por favor selecciona una \xE1rea de recogida",
    addressEmpty: "La direcci\xF3n no puede estar vacia",
    postalEmpty: "C\xF3digo postal inv\xE1lido",
    addressDetail: "Direcci\xF3n",
    defaultAddress: "Establecer como direcci\xF3n por defecto"
  },
  vanAddressList: {
    add: "Anadir direcci\xF3n"
  }
};
export {
  stdin_default as default
};
