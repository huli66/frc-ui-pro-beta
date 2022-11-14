import React from "react";

export function fillRef<T>(ref: React.Ref<T>, node: T) {
  if (typeof ref === "function") {
    ref(node);
  } else if (typeof ref === "object" && ref && "current" in ref) {
    (ref as any).current = node;
  }
}

export function composeRef<T>(...refs: React.Ref<T>[]): React.Ref<T> {
  const refList = refs.filter((ref) => ref);
  if (refList.length <= 1) {
    return refList[0];
  }

  return (node: T) => {
    refs.forEach((ref) => {
      fillRef(ref, node);
    });
  };
}

export function isString(value: any): boolean {
  return typeof value === "string";
}

export function isNumber(value: any): boolean {
  return typeof value === "number";
}

let oldMiddlePosition = 0;
export function controlScrollSpeed(
  node: HTMLElement,
  maxSpeed: number,
  scrollPosition: number,
  innerNode?: HTMLElement,
  middleCallBack?: () => void
  // init?: boolean
) {
  const scrollTop = node.scrollTop;

  // console.log('in-scroll', scrollTop, innerNode?.clientHeight, oldMiddlePosition);

  // 向下
  if (scrollTop > scrollPosition) {
    if (scrollTop - scrollPosition > maxSpeed) {
      node.scrollTop = scrollPosition + maxSpeed; // 例: 滚动速度 > 4 时，仅 + 4;
    }

    if (
      innerNode &&
      (scrollTop - oldMiddlePosition === innerNode.clientHeight / 2 ||
        (scrollPosition - oldMiddlePosition < innerNode.clientHeight / 2 && scrollTop - oldMiddlePosition > innerNode.clientHeight / 2)
      )) {
      oldMiddlePosition = scrollTop - oldMiddlePosition;
      middleCallBack && middleCallBack();
    }
  }

  // 向上
  if (scrollTop < scrollPosition) {
    if (scrollPosition - scrollTop > maxSpeed) {
      node.scrollTop = scrollPosition - maxSpeed;
    }
  }

  return node.scrollTop;

  // scrollPosition = node.scrollTop;
};
