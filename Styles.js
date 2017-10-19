import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 45, 
        width: 270,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        fontSize: 18,
        borderWidth: 0
    },
    iconMagniGlass: {
        marginLeft: 6,
        marginRight: 6,
        color : 'gray'
    },
    rightChevron: {
        color: 'gray'
    }
});

export default styles;