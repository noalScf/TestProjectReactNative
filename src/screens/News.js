import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
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

//компонент отображения новости в списке новостей
class News extends React.PureComponent {
    render() {
        return (

            <View style={{flex: 1, backgroundColor: '#f5fcff', margin: 10}}>
                <TouchableOpacity onPress={() => {
                    /* передаем параметры через навигацию */
                    this.props.navigation.navigate('NewsDetail', {
                        title: this.props.title,
                        text: this.props.text,
                        image: this.props.image
                    });
                }}>

                    <Text style={styles.Title}>{this.props.title}</Text>
                    <Image source={{uri: this.props.image}}  style={{width: 193, height: 110}}/>
                    <Text style={styles.Text}>{this.props.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


// свойства компонента
News.propTypes = {
    news: PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string,
        image: PropTypes.string
    })
};
// свойства по-умолчанию
News.defaultProps = {
    news: {
        title: "title",
        text: "text",
        image: "image"
    }
};

export default News