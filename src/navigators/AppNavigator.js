import React from "react";
import {SafeAreaView} from 'react-navigation';
import {StackNavigator, SwitchNavigator} from 'react-navigation';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
} from 'react-native';
import Auth from "../screens/Auth";
import NewsFeed from "../screens/NewsFeed";
import NewsDetail from "../screens/NewsDetail";

//для основной части приложения, той что скрыта от неавторизованного юзера выбираем навигацию типа стек
// тут могут быть и табики и левое меню и д.р

const Main = StackNavigator({
    NewsFeed: NewsFeed,
    NewsDetail: NewsDetail
});
//switcher navigators
//позволяет переключаться между навигаторами, читай документацию
export const Navigator = SwitchNavigator(
    {
        Auth: Auth,
        Main: Main
    },
    {
        initialRouteName: 'Auth',
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


class AppNavigator extends React.PureComponent {
    render() {
        //KeyboardAvoidingView нужен для иммитации поведения клавиатуры как на адройде для иос
        const Container = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
        //SafeAreaView нужно для айфонов Х
        return (

            <Container style={{flex: 1}} behavior="padding" enabled>
                <Navigator/>
            </Container>

        )
    }
}


export default AppNavigator;