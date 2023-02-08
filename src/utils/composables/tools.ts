import { ElNotification, ElMessage } from "element-plus";
// 自定义封装提示
export const Notification = (
  type: "" | "success" | "warning" | "info" | "error",
  message: string,
  title?: string,
  dangerouslyUseHTMLString = false
) => {
  ElNotification({
    title: title,
    message: message,
    dangerouslyUseHTMLString: dangerouslyUseHTMLString,
    type: type,
  });
};
export const MessageTips = (
  message: string,
  type:"success" | "warning" | "info" | "error" = "info"
) => {
  ElMessage({
    message: message,
    type: type,
  });
};
