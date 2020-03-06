
import { getData, getDataSecond } from '../ajax'
//初始化已授权管理员
const getAuthorizeManager = getData('/mgr/hr/learn/train/getLicensing.do');
//初始化已授权管理员
const addOrUpdLicensing = getDataSecond('/mgr/hr/learn/train/addOrUpdLicensing.do');
export default {
  getAuthorizeManager,
  addOrUpdLicensing
}
