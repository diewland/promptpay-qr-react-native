'use strict';

import React, { Component } from 'react'
import QRCode from 'react-native-qrcode'
import { StyleSheet, View, TextInput } from 'react-native'

class App extends Component {

    state = {
        text: 'Helloworld',
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
        // TODO
        let text = this.state.acc_id + this.state.amount;
        //
        this.setState({
            text:   text,
            acc_id: this.state.acc_id,
            amount: this.state.amount,
        })
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
                <QRCode
                    value={this.state.text}
                    size={300}
                    bgColor='black'
                    fgColor='white'
                />
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