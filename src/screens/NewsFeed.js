import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Text
} from "react-native"
import NewsFeedActions from "../actions/NewsFeedActions";
import News from "../screens/News";

const styles = StyleSheet.create({
    processContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
});

class NewsFeed extends React.PureComponent {
    //название раздела
    static navigationOptions = {
        title: 'Новостная лента',
    };

    componentDidMount() {
        //метод жизненного цикла, читай документацию
        //загружаем список новостей
        this.ConnectForGetNews();
    }

    async ConnectForGetNews() {
        const result = await this.props.GetNews();
        if (result.msg) {
            //ошибка загрузки новостей
            alert("ошибка загрузки новостей");
        }
    }

    render() {
        const {
            news
        } = this.props;

//ждем загрузки списка новостей
        if (news.loading) {
            return (
                <View style={styles.processContainer}>
                    <ActivityIndicator/>
                </View>
            )
        }
        else {
            if (news.data != null) {
                const NewsList = news.data.map((item) => {
                    return (
                        <News
                            title={item.title}
                            text={item.text}
                            image={item.image}
                            navigation={this.props.navigation}
                        />


                    );
                });


                return (
                    <ScrollView>
                        {NewsList}
                    </ScrollView>
                );
            }
            else {
                return (
                    <View>
                        <Text>Новости отсутствуют</Text>
                    </View>
                )
            }

        }
    }
}

// свойства компонента
NewsFeed.propTypes = {
    news: PropTypes.shape({
        loading: PropTypes.bool,
        data: PropTypes.object
    })
};
// свойства по-умолчанию
NewsFeed.defaultProps = {
    news: {
        loading: true,
        data: null
    }
};


//функция получает на вход глобальный стейт и собственные свойства компонента
//news - свойство глобального стейта описано в фалйе reducers/index.js
const mapStateToProps = (state, ownProps) => {
    return {
        news: state.news
    }
};

//тут все экшены которые будт доступны в компоненте
const actions = {...NewsFeedActions};
//connect() - функция ысшего порядка которая связывает глобальный стейт с компонентом
export default connect(mapStateToProps, actions)(NewsFeed);