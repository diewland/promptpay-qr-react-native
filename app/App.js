import React, { Component } from 'react'
import QRCode from 'react-native-qrcode'
import { StyleSheet, View, TextInput } from 'react-native'
import PromptPayQR from './promptpay-qr'

class App extends Component {

    state = {
        text:   null,
        acc_id: '',
        amount: '',
    }

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
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="เบอร์โทรศัพท์ หรือ เลขบัตรปชช"
                    onChangeText={ (text) => this.set_acc_id(text) }
                />
                <TextInput
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