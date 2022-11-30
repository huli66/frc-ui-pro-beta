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
export function controlScrollSpeed(
  node: HTMLElement,
  scrollPosition: number,
  innerNodeHeight?: number,
  prvePageCallBack?: () => void,
  nextPageCallBack?: () => void,
  isScrollPrvePage?: any,
  // init?: boolean
) {

  // if (innerNodeHeight) {
  //   console.log(
  //     'save',
  //     node.scrollTop,
  //     node.clientHeight + node.scrollTop,
  //     innerNodeHeight
  //   );
  // }

  let pageTurnOffSet: any = 0;

  // 向上
  if (node.scrollTop < scrollPosition) {
    if (innerNodeHeight && node.scrollTop <= innerNodeHeight * 0.2) {
      if (prvePageCallBack) {
        pageTurnOffSet = prvePageCallBack();
      }

      if (pageTurnOffSet) {
        node.scrollTop += pageTurnOffSet * 24 - node.clientHeight;
      }

      isScrollPrvePage.current = true;
    }
  }

  // 向下
  if (node.scrollTop > scrollPosition) {
    if (innerNodeHeight && node.clientHeight + node.scrollTop >= innerNodeHeight * 0.8) {
      if (nextPageCallBack) {
        pageTurnOffSet = nextPageCallBack();
      }

      if (pageTurnOffSet) {
        node.scrollTop -= pageTurnOffSet * 24;
      }
    }
  }

  return node.scrollTop;
};
