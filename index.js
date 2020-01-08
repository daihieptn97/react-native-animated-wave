/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Animated,
    Image,
    Easing
} from 'react-native';

let numberAnimation = 4;
let animWaveTimes = [];
let animWaveTimeOPs = [];

class AnimatedWave extends Component {
    constructor() {
        super();
        this.waveTime = [];
        this.waveTimeOP = [];
        this.state = {
            numberLoop: 100,
            funcLoop: null
        };
        this.init();
    }

    init() {
        for (let i = 0; i < numberAnimation; i++) {
            this.waveTime[i] = new Animated.Value(0.3);
            this.waveTimeOP[i] = new Animated.Value(0.7);
        }
    }

    setValueDefault() {
        for (let i = 0; i < numberAnimation; i++) {
            this.waveTime[i].setValue(0.3);
            this.waveTimeOP[i].setValue(0.7);
        }
    }

    componentDidMount(): void {

        for (let i = 0; i < numberAnimation; i++) {
            animWaveTimes.push(
                Animated.timing(
                    this.waveTime[i],
                    {
                        toValue: 2,
                        duration: 3000,
                        easing: Easing.in(),
                        friction: 10000,
                    }
                )
            );

            animWaveTimeOPs.push(
                Animated.timing(
                    this.waveTimeOP[i],
                    {
                        toValue: 0,
                        duration: 6000,
                    }
                )
            );
        }

        this.spring();


    }

    spring() {

        let a = Animated.loop(
            Animated.parallel([
                Animated.stagger(800, animWaveTimes),
                Animated.stagger(800, animWaveTimeOPs),
            ])
        );
        this.setState({
            funcLoop: a
        });
        a.start();
    }

    renderWave = () => {
        const arr = [];
        for (let i = 0; i < numberAnimation; i++) {
            arr.push(
                <Animated.View key={i}
                               style={[styles.wave, {
                                   transform: [{scale: this.waveTime[i]}],
                                   zIndex: -1,
                                   opacity: this.waveTimeOP[i]
                               }]}/>
            )
        }

        return arr;
    };

    render() {

        console.log(this.state.funcLoop);

        return (
            <View style={[styles.container]}>
                <TouchableOpacity
                    onPress={() => {
                        this.state.funcLoop.stop();
                        this.setValueDefault();
                    }}
                >
                    <Animated.Image
                        style={{
                            width: 150,
                            height: 150,
                            // transform: [{scale: this.springValue}],
                            borderRadius: 100
                        }}
                        source={{uri: 'https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/81161208_1512678368910055_1072934121040248832_o.jpg?_nc_cat=108&_nc_ohc=IOJPGLSHVv0AQnJ2iOymjuFzQjbXMMXZmotur9NFl8brQIlLxRvICpUYA&_nc_ht=scontent.fhan2-3.fna&oh=f1a7c9eacd5cde24f9dbf461f1e1e259&oe=5E94A057'}}
                    />

                    {this.renderWave()}

                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    wave: {
        backgroundColor: "rgba(33,151,56,0.34)",
        width: 150,
        height: 150,
        position: 'absolute',
        zIndex: -1,
        borderRadius: 200
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: 'rgba(190,190,190,0.34)'
    },
});


export default AnimatedWave;
