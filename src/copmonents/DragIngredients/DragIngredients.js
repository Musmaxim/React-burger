import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import styles from "./DragIngredients.module.css";
import { dataType } from "../../utils/dataType";
import {
  REMOVE_INGREDIENT,
  SORT_INGREDIENT,
} from "../../services/actions/BurgerConstructor";
import PropTypes from "prop-types";

export const DragIngredients = ({ data, index }) => {
  const dispatch = useDispatch();

  const [{ isDrag }, dragRef] = useDrag({
    type: "element",
    item: {
      id: data._id,
      index,
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "element",
    collect: (monitor) => ({}),
    hover(item) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex !== hoverIndex) {
        dispatch({
          type: SORT_INGREDIENT,
          dragIndex,
          hoverIndex,
        });
        item.index = hoverIndex;
      }
    },
  });

  return (
    <div
      className={`${styles.container} ${isDrag ? styles.dragging : ""}`}
      ref={(node) => dragRef(dropRef(node))}
    >
      <div className={styles.dragIcon}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        type=""
        isLocked={false}
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={() =>
          dispatch({
            type: REMOVE_INGREDIENT,
            ingredient: data,
          })
        }
      />
    </div>
  );
};

DragIngredients.propTypes = {
  data: dataType,
  index: PropTypes.number.isRequired,
};
