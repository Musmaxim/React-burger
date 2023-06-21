import { FC } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import styles from "./DragIngredients.module.css";
import {
  REMOVE_INGREDIENT,
  SORT_INGREDIENT,
} from "../../services/actions/BurgerConstructor";
import { TIngredient } from "../../utils/types";
import { useAppDispatch } from "../../store/Hooks";

type TDraggable = {
  data: TIngredient;
  index: number;
};

type TDragItem = {
  id: string;
  index: number;
};

export const DragIngredients: FC<TDraggable> = ({ data, index }) => {
  const dispatch = useAppDispatch();

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

  const [, dropRef] = useDrop<TDragItem>({
    accept: "element",
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
