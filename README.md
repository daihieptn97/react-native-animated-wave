# react-native-animated-wave

## Installation Instructions

> `$ yarn add react-native-animated-wave` 


## Usage
```javascript
import AnimatedWave from "react-native-animated-wave";

export default class App extends Component {
    constructor() {
        super();
    }

    render() {
        return <View style={styles.container}>
            <AnimatedWave
                sizeOvan={150}
                // onPress={() => alert("Hello")}
                colorOvan={'#bebebe'}
                zoom={5}
            />
        </View>
    }
}
```

## Explain the attributes

|  properties   | datatypes     | explain  |
| ------------- |:-------------:| -----:|
| numberlayer   | number        | number of classes emitted |
| sizeOvan      | number        |   Center circle size |
| colorOvan     | string      |    bubble color |
| zoom          | number      |     |
| onPress       | arrow function      |     |
| styleContainer       | style      |     |
| source       | source img      |     |
