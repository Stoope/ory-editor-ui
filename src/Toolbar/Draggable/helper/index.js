export const source = {
  beginDrag({ insert, ...props }) {
    props.layoutMode();
    return {
      node: insert,
      rawNode: () => insert,
      ...props
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    if (monitor.didDrop()) {
      setTimeout(() => {
        item.insertMode();
      }, 10);
      // If the item drop occurred deeper down the tree, don't do anything
      return;
    }

    item.clearHover();
    setTimeout(() => {
      item.insertMode();
    }, 100);
  }
};

export const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview()
});
