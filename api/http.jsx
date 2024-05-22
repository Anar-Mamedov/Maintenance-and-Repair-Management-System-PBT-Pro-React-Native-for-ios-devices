import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Axios instance'ını yaratıyoruz. baseURL'i dinamik olarak her istekten önce set ediyoruz.
const AxiosInstance = axios.create();

AxiosInstance.interceptors.request.use(async (request) => {
  const baseURL = await AsyncStorage.getItem("baseURL");
  request.baseURL = baseURL ? `${baseURL}/` : "default_base_url/"; // Varsayılan URL belirtilebilir.

  const token = await AsyncStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  // Burada diğer header bilgileri de eklenebilir.
  // Örneğin, bir User-ID header'ı eklemek isterseniz:
  // const userId = await AsyncStorage.getItem('userId');
  // request.headers['User-Id'] = userId;

  return request;
});

AxiosInstance.interceptors.response.use(
  function (response) {
    return response; // Burada response.data yerine tüm response nesnesini döndürüyoruz.
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      // Diğer gereksiz bilgileri de temizleyebilirsiniz.
      // window.location.href = "/auth"; // Kullanıcıyı yetkilendirme sayfasına yönlendiriyoruz.
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
