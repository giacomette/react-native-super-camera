# react-native-super-camera

Camera Manager

## Installation

```sh
npm install react-native-super-camera
```

## Usage

```js
import SuperCamera from 'react-native-super-camera';

// ...

<SuperCamera
  visible={open}
  onCancel={() => console.log('cancel take photo')}
  onCapture={(fileUrl) => {
    console.log(fileUrl);
  }}
/>;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
