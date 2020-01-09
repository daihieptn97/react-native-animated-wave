/**
 *
 * https://github.com/facebook/react-native
 *
 * @author : Trần Đại hiệp
 * @link : https://github.com/daihieptn97/react-native-animated-wave
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

const DEFAULT_NUMBER_LAYER = 6;
let animWaveTimes = [];
let animWaveTimeOPs = [];
const DEFAULT_SIZE_OVAN = 150;
const DEFAULT_COLOR_OVAN = 'rgba(33,151,56,0.34)';
const DEFAULT_SIZE_ZOOM = 2;
const DEFAULT_SOUCE_IMG = null;
const DEFAULT_ICON = null;
const DEFAULT_STYLE = {};

class AnimatedWave extends Component {
    constructor(props) {
        super();
        this.waveTime = [];
        this.waveTimeOP = [];
        this.init();
        this.setValueDefault();
        this.state = {
            run: true
        }
    }

    getNumberLayer() {
        const {numberlayer} = this.props;
        return numberlayer;
    }

    getSizeOvan() {
        const {sizeOvan} = this.props;
        return sizeOvan;
    }

    getColor() {
        const {colorOvan} = this.props;
        return colorOvan;
    }

    getSizeZoom() {
        const {zoom} = this.props;
        return zoom;
    }

    getSourceIMG() {
        const {source} = this.props;
        return source;
    }


    init() {
        for (let i = 0; i < DEFAULT_NUMBER_LAYER; i++) {
            this.waveTime[i] = new Animated.Value(0.3);
            this.waveTimeOP[i] = new Animated.Value(0.7);
        }
    }

    setValueDefault() {
        for (let i = 0; i < DEFAULT_NUMBER_LAYER; i++) {
            this.waveTime[i].setValue(0.3);
            this.waveTimeOP[i].setValue(0.7);
        }
    }

    componentDidMount(): void {
        for (let i = 0; i < DEFAULT_NUMBER_LAYER; i++) {
            animWaveTimes.push(
                Animated.timing(
                    this.waveTime[i],
                    {
                        toValue: this.getSizeZoom(),
                        duration: i === 0 ? 1000 : 1500,
                        easing: Easing.in(),
                        friction: 10,
                    }
                )
            );

            animWaveTimeOPs.push(
                Animated.timing(
                    this.waveTimeOP[i],
                    {
                        toValue: 0,
                        duration: i === 0 ? 2000 : 2500,
                    }
                )
            );
        }
        this.runAnimation();
    }

    runAnimation() {
        let a = Animated.loop(
            Animated.parallel([
                Animated.stagger(600, animWaveTimes),
                Animated.stagger(800, animWaveTimeOPs),
            ])
        );
        this.setState({
            funcLoop: a
        });
        a.start();
    }

    componentWillUnmount() {
        this.state.funcLoop.stop();
    }

    renderWave = () => {
        const arr = [];
        for (let i = 0; i < DEFAULT_NUMBER_LAYER; i++) {
            arr.push(
                <Animated.View key={i}
                               style={[styles.wave, {
                                   transform: [{scale: this.waveTime[i]}],
                                   zIndex: -1,
                                   opacity: this.waveTimeOP[i],
                                   width: this.getSizeOvan(),
                                   height: this.getSizeOvan(),
                                   backgroundColor: this.getColor()
                               }]}/>
            )
        }
        return arr;
    };

    hanlderClickRun = () => {

        try {
            this.props.onPress();
        } catch (e) {
            console.log(e);
        }

        // if (this.state.run) {
        //     this.setState({
        //         run: false
        //     });
        //     this.runAnimation();
        // } else {
        //     this.state.funcLoop.stop();
        //     this.setValueDefault();
        //     this.setState({
        //         run: true
        //     });
        // }
    }

    getStyleContainer() {
        const {style} = this.props;
        return style;
    }

    render() {
        if (this.getSourceIMG()) {
            return (
                <View style={[styles.container, this.getStyleContainer()]}>
                    <TouchableOpacity
                        onPress={this.hanlderClickRun}
                    >
                        <Animated.Image
                            style={{
                                width: this.getSizeOvan(),
                                height: this.getSizeOvan(),
                                borderRadius: this.getSizeOvan()
                            }}
                            source={this.getSourceIMG()}

                        />

                        {this.renderWave()}
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={[styles.container, this.getStyleContainer()]}>
                    <TouchableOpacity
                        onPress={this.hanlderClickRun}
                    >
                        <View
                            style={
                                {
                                    width: this.getSizeOvan(),
                                    height: this.getSizeOvan(),
                                    borderRadius: this.getSizeOvan(),
                                    backgroundColor: this.getColor(),
                                    justifyContent: "center",
                                    alignItems: "center"
                                }
                            }>
                            {this.props.icon}
                        </View>

                        {this.renderWave()}
                    </TouchableOpacity>
                </View>
            );
        }
    }
}


const styles = StyleSheet.create({
    wave: {

        position: 'absolute',
        zIndex: -1,
        borderRadius: 200
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

AnimatedWave.defaultProps = {
    numberlayer: DEFAULT_NUMBER_LAYER,
    sizeOvan: DEFAULT_SIZE_OVAN,
    colorOvan: DEFAULT_COLOR_OVAN,
    zoom: DEFAULT_SIZE_ZOOM,
    source: DEFAULT_SOUCE_IMG,
    icon: DEFAULT_ICON,
    styleContainer: DEFAULT_STYLE,
    onPress: () => {
    }
}

export default AnimatedWave;
