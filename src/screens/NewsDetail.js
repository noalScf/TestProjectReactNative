import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    View,
    StyleSheet, Text, ScrollView, Image
} from "react-native"

//Стили заголовка и текста
const styles = StyleSheet.create({
    Title: {
        flex: 1,
        textAlign: 'left',
        fontFamily: 'Merriweather',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#465457'
    },
    Text: {
        flex: 1,
        textAlign: 'left',
        fontFamily: 'Merriweather',
        fontSize: 12,
        color: 'black'
    }
});

class NewsDetail extends React.PureComponent {
    render() {
        //задаем параметры из навигации
        const {navigation} = this.props;
        const title = navigation.getParam('title', 'Title');
        const text = navigation.getParam('text', 'text');
        const image = navigation.getParam('image', 'image');

        return (
            <ScrollView>
                <View style={{flex: 1, backgroundColor: '#f5fcff', margin: 10}}>
                    <Text style={styles.Title}>{title}</Text>
                    <Image source={{uri: image}}  style={{width: 193, height: 110}}/>
                    <Text style={styles.Text}>{text}</Text>
                </View>

            </ScrollView>
        );
    }
}

export default NewsDetail