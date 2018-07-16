import {
    AsyncStorage
} from "react-native";
//далее иду ключи экшенов, по ним редюсеры понимаю как надо изменить глобальный стейт
//смотри файл reducers/AuthReducer.js
export const GET_NEWS = "GET_NEWS";
export const SET_DATA = "SET_DATA";
const accessTokenKey = 'access_token_key';//ключ по которому мы будем сохранять/получать данные в AsyncStore

const getNews = (state) => {
    return {
        type: GET_NEWS,
        state
    }
};

export default {

    // загружаем новости
    GetNews() {
        return async (dispatch, getState) => {
            dispatch(getNews(true));
            //получаем токен
            const token = await AsyncStorage.getItem(accessTokenKey);
            //получаем данные с сервера
            try {

                let response = await fetch(
                    'http://u0517642.isp.regruhosting.ru/api/news/',
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                let responseJson = await response.json();
                if(responseJson.msg) {
                    dispatch(getNews(false));
                    return responseJson;
                }
                else
                dispatch({
                    type: SET_DATA,
                    data: responseJson
                });
                dispatch(getNews(false));
                return responseJson;
            } catch (error) {
                dispatch(getNews(false));
                console.error(error);
            }
        }
    }

}
