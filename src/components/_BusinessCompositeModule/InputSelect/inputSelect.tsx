import React, { forwardRef,useCallback,useEffect,useMemo,useState } from 'react';
import classNames from "classnames";
import Input,{FRCInputProps,InputRef} from '../../Input';
import Dropdown from '../../Dropdown';

export interface FRCInputSelectProps extends FRCInputProps{
  /** 下拉框选项 */
  options?:Array<{label:React.ReactNode,value:string}>;
  /** 下拉框类名 */
  dropdownClassName?:string;
  /** 下拉框的样式 */
  dropdownStyle?:React.CSSProperties;
  /** 宽度 */
  width?:number | string;
  /** 选中回调 */
  onDropdownSelected?:(value:string) => void;
  /**  */
  onBlur?: () => void;
}

export const InputSelect = forwardRef<InputRef,FRCInputSelectProps>( 
  (props,ref) => {
  const {
    options,
    dropdownClassName,
    dropdownStyle,
    width,
    onBlur,
    onDropdownSelected,
    onChange,
    ...rest
  } = props;
  const [dropdownVisible,setDropDownVisible] = useState<boolean>(false);
  const [currentSelected,setCurrentSelected] = useState<string[]>([]);
  
  const handleMenuClick = useCallback(({key}) => {
    setCurrentSelected([key]);
    setDropDownVisible(false);
    onDropdownSelected && onDropdownSelected(key);
    onBlur && onBlur();
  },[onDropdownSelected,onBlur]);

  const menu = useMemo(() => {
    const list = (options || []).map(o => ({
      label:o.label,
      key:o.value
    }))
    return {
      items:list,
      selectable: true,
      selectedKeys: currentSelected,
      onClick:handleMenuClick,
    }
  },[options,currentSelected,handleMenuClick]);

  const overlayCls = classNames(dropdownClassName,'frc-input-select-overlay',{
    'frc-input-select-overlay-empty':!options?.length
  });

  useEffect(() => {
    let handle:any; 
    if(dropdownVisible && !!options?.length){
      handle = (e:KeyboardEvent) => {
        if(e.code === 'ArrowDown'){
          setCurrentSelected(([pre]) => {
            let curIndex = options.findIndex((o) => o.value === pre);
            let lastIndex = options.length - 1;
            const targetIndex = Math.min(curIndex + 1, lastIndex);
            return [options[targetIndex].value]
          });
        }
        if(e.code === 'ArrowUp'){
          setCurrentSelected(([pre]) => {
            let curIndex = options.findIndex((o) => o.value === pre);
            const targetIndex = Math.max(curIndex - 1, 0);
            return [options[targetIndex].value]
          })
        }
      }
      window.addEventListener('keydown', handle);
    }
    return () => {
      window.removeEventListener('keydown',handle);
    }
  },[dropdownVisible,options]);
  
  useEffect(
    () => {
      let handle:any; 
      if(dropdownVisible && !!options?.length){
        handle = (e:KeyboardEvent) => {
          if(e.code === 'Enter'){
            setDropDownVisible(false);
            const item = options.find((o) => (o.value === currentSelected[0]));
            item && onDropdownSelected && onDropdownSelected(currentSelected[0]);
            onBlur && onBlur();
          }
        }
        window.addEventListener('keydown', handle);
      }
      return () => {
        window.removeEventListener('keydown',handle);
      }
    },[
      dropdownVisible,
      options,
      currentSelected,
      onDropdownSelected,
      onBlur
    ]
  );

  useEffect(() => {
    if(!!options?.length && dropdownVisible){
      setCurrentSelected([options[0].value])
    }
  },[options,dropdownVisible]);

  const inputProps = {
    ...rest,
    onBlur: (!dropdownVisible && onBlur) || undefined,
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => {
      setDropDownVisible(true);
      onChange && onChange(e);
    }
  }
  
  return (
    <>
      <Dropdown
        triggerStyle={{width}}
        className='frc-input-select-dropdown'
        visible={dropdownVisible}
        onVisibleChange={(visible) => setDropDownVisible(visible)}
        overlayClassName={overlayCls}
        arrow={false}
        menuOptions={menu}
        overlayStyle={dropdownStyle}
      >
        <Input {...inputProps} ref={ref}  />
      </Dropdown>
    </>
  )
  }
)

export default InputSelect;