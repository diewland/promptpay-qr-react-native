import React, { Component } from 'react'
import QRCode from 'react-native-qrcode'
import {
    StyleSheet,
    View,
    TextInput,
    AsyncStorage
} from 'react-native'
import PromptPayQR from './promptpay-qr'

// storage key
const PPQR_DATA = "PPQR_DATA"

class App extends Component {

    // app data
    state = {
        text:   null,
        acc_id: '',
        amount: '',
    }

    // component mount event
    componentDidMount() {
        AsyncStorage.getItem(PPQR_DATA).then((v) => {
            if(v){
                this.state = JSON.parse(v)
                this.setState(this.state)
            }
        })
    }

    // app functions
    set_acc_id(txt){
        this.state.acc_id = txt;
        this.render_qr();
    }
    set_amount(txt){
        this.state.amount = txt;
        this.render_qr();
    }
    render_qr(){
        let text = PromptPayQR.gen_text(this.state.acc_id, this.state.amount);
        this.setState({ text })
        AsyncStorage.setItem(PPQR_DATA, JSON.stringify(this.state));
    }

    // core render function
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.acc_id}
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="เบอร์โทรศัพท์ หรือ เลขบัตรปชช"
                    onChangeText={ (text) => this.set_acc_id(text) }
                />
                <TextInput
                    value={this.state.amount}
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="จำนวนเงิน (ไม่ระบุก็ได้)"
                    onChangeText={ (text) => this.set_amount(text) }
                />
                {
                    this.state.text ? (
                        <QRCode
                                value={this.state.text}
                                size={300}
                                bgColor='black'
                                fgColor='white'
                            />

                    ) : (
                        <View />
                    )
                }
             </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    input: {
        alignSelf: 'stretch',
        fontSize: 18
    },
})

export default App