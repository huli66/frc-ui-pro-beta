// 文件名为 switch，提示报错，故改为 switch-core
import React, { FC } from "react";
import classNames from "classnames";
import { Switch as AntdSwitch, SwitchProps } from "antd";

interface BaseSwitch {
  /** 组件自动获取焦点 */
  autoFocus?: boolean;
  /** 指定当前是否选中 */
  checked?: boolean;
  /** 选中时的内容 */
  checkedChildren?: React.ReactNode;
  /** Switch 器类名 */
  className?: string;
  /** 初始是否选中 */
  defaultChecked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 加载中的开关 */
  loading?: boolean;
  /** 非选中时的内容 */
  unCheckedChildren?: React.ReactNode;
  /** 变化时回调函数 */
  onChange?: (checked: boolean, event: Event) => void;
  /** 点击时回调函数 */
  onClick?: (checked: boolean, event: Event) => void;
  /** extraText 额外文字提示 */
  extraText?: string;
  /** extraTextPlacement 额外文字提示位置 默认right */
  extraTextPlacement?: "left" | "right";
}

export type FRCSwitchProps = BaseSwitch & SwitchProps;

export const Switch: FC<FRCSwitchProps> = (props) => {
  const { className, extraText, extraTextPlacement, ...restProps } = props;

  const classes = classNames("frc-switch", className, {});

  const options = {
    className: classes,
    ...restProps,
  };
  if (extraText) {
    const placement = extraTextPlacement || "right";
    return (
      <div
        className={classNames("frc-switch-with-extra-text", {
          "flex-reverse": placement === "left",
        })}
      >
        <AntdSwitch {...options} />
        <span className="frc-switch-extra-text">{extraText}</span>
      </div>
    );
  }

  // main
  return <AntdSwitch {...options} />;
};

// normal
Switch.defaultProps = {
  autoFocus: false,
  defaultChecked: false,
  disabled: false,
  loading: false,
};

export default Switch;
