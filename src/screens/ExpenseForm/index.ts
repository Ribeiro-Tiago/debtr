import { connect } from 'react-redux';

import component from './component';
import { StoreState } from '../../types/store';
import { addItem, updateItem, removeItem } from '../../store/actions/items';
import { Item } from '../../types';

const mapStateToProps = (state: StoreState) => {
  const item = state.current.item;

  return {
    item,
    isNew: !item,
    selectedMonths: state.current.months,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    create: (item: Item) => dispatch(addItem(item)),
    update: (item: Item) => dispatch(updateItem(item)),
    remove: (id: string) => dispatch(removeItem(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(component);
