import axios from 'axios'
var instance = axios.create({
  baseURL: '/api'
})
/* name: 查看用车类型列表
 * method: GET
 * url: /v1/vehicle_reservation/vehicle_type_list
 */
export function getVehicleTypeList() {
  return instance
    .get('/v1/vehicle_reservation/vehicle_type_list')
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
}
