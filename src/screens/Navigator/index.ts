import { connect } from 'react-redux';

import Navigator from './component';
import { Item } from '../../types';
import { addAmount } from '../../store/actions/amountLeft';
import { setItems } from '../../store/actions/items';

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setAmountLeft: (amount: number) => dispatch(addAmount(amount)),
    setItems: (items: Item[]) => dispatch(setItems(items)),
  };
};

export default connect(null, mapDispatchToProps)(Navigator);
