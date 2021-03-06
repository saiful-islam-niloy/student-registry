import axios from 'axios';
class RestClient {
  static GetRequest(getUrl) {
    return axios
      .get(getUrl)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  static PostRequest = (postUrl, postJson) => {
    let config = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    return axios
      .post(postUrl, postJson, config)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  };

  static PutRequest = (putUrl, putJson) => {
    let config = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    return axios
      .put(putUrl, putJson, config)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  };

  static DeleteRequest(deleteUrl) {
    return axios
      .delete(deleteUrl)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }
}
export default RestClient;
