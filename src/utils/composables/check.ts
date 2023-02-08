import { Notification } from "./tools";
/** 校验手机号
 * 
 * @param rule
 * @param value
 * @param callback
 * @returns
 */
export const checkPhone = (rule: any, value: string, callback: Function) => {
  const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/; //手机号正则表达式
  //const reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/; //座机号正则表达式
  //const reg =/^([1-9]{1})(\d{14}|\d{18})$/; //通用银行账号正则表达式
  //const reg = /^[1-9][0-9]{5}$/; //邮编正则表达式
  //const reg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;//传真正则表达式
  if (reg.test(value)) {
    callback();
  } else {
    return callback(new Error("请输入正确的手机号"));
  }
};
/** 校验密码
 * 
 * @param rule
 * @param value
 * @param callback
 * @returns
 */
export const checkPassword = (rule: any, value: string, callback: Function) => {
  const reg =
    /(?![0-9]+$)(?![._~!@#$^&*]+$)^[a-zA-Z][0-9A-Za-z._~!@#$^&*]{8,16}/;

  /**
   * 规则
   *    1. 密码必须包含字母和数字两种,可选特殊符号._~!@#$^&*
   *    2. 必须以字母开头,其余不能纯数字或纯特殊符号
   *    3. 长度 8~16位
   * 注:
   *    (?![0-9]+$) 排除纯数字
   */
  if (reg.test(value)) {
    callback();
  } else {
    Notification(
      "info",
      "<ul>" +
      "<li>包含字母和数字两种<li>" +
      "<li>选特殊符号  ._~!@#$^&*<li>" +
        "<li>必须以字母开头<li>" +
        "<li>长度 8~16位<li>" +
      "<ul>",
      "密码规则",
      true
    );
    return callback(new Error("根据密码规则输入密码"));
  }
};
