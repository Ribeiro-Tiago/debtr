import { connect } from 'react-redux';

import component from './component';
import { StoreState } from '../../types/store';
import { Item } from '../../types';
import { toggleItemStatus } from '../../store/actions/items';
import { addAmount, subtractAmount } from '../../store/actions/amountLeft';

const getMonthlyItems = (items: Item[]) => {
  const currMonth = new Date().getMonth();

  return items.filter(({ months }) => months.includes(currMonth));
};

const mapStateToProps = (state: StoreState) => {
  return {
    items: getMonthlyItems(state.items),
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    togglePaidStatus: (id: string) => dispatch(toggleItemStatus(id)),
    updateAmountLeft: (amount: number, isPaid: boolean) => {
      return isPaid
        ? dispatch(addAmount(amount))
        : dispatch(subtractAmount(amount));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(component);
