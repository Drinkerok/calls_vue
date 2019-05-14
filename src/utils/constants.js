export const API = {
  cities: "data.json",
  modal: "modal.json",
};

export const ModalPropsToString = {
  type: {
    department: 'Филиал',
    user: 'Сотрудник'
  },
  call_type: {
    incoming: 'входящие',
    outgoing: 'исходящие'
  },
  call_status: {
    summ: '',
    fail: 'пропущенные',
    not_waste: 'неотработанные',
    waste_success: 'отработанные',
    waste_fail: 'отработанные не вовремя',
    success: 'успешные'
  }
};

const DATE_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timezone: 'UTC',
};

export function dateToString(val) {
  return val ? val.toLocaleString("ru", DATE_OPTIONS) : null;
}
