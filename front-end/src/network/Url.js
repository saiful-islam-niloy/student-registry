class Url {
  static BASE_URL = 'http://localhost:5050';

  static GET_ALL_STUDENT = this.BASE_URL + '/get-all-student';
  static ADD_STUDENT     = this.BASE_URL + '/add-student';
  static UPDATE_STUDENT  = this.BASE_URL + '/update-student';
  static DELETE_STUDENT  = this.BASE_URL + '/delete-student';
}
export default Url;
